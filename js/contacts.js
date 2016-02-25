jQuery(document).ready(function(){  
  function editContact(contactID){
    if(!jQuery("#f_firstname"+contactID).val() && !jQuery("#f_lastname"+contactID).val() && !jQuery("#f_company"+contactID).val() && !jQuery("#f_email"+contactID).val() && !jQuery("#f_tel"+contactID).val()){
      alert("Bitte mindestens Vornamen/Nachnamen/Firma/Email oder Telefonnumer angeben!");
    }else{
      jQuery.get("editContact.php",{
        cid : contactID,
        firstname : jQuery("#f_firstname"+contactID).val(),
        lastname : jQuery("#f_lastname"+contactID).val(),
        firm : jQuery("#f_company"+contactID).val(),
        email : jQuery("#f_email"+contactID).val(),
        tel : jQuery("#f_tel"+contactID).val(),
        note : jQuery("#f_note"+contactID).val()
        },function(data){
        if(data == "1"){
          updateContacts();
          alert("Kontakt erfolgreich angepasst!");
          console.log("Edit contact successfull!");
        }else{
          updateContacts();
          alert("Kontakt konnte nicht angepasst werden!");
          console.log("ERROR: Edit contact failed!");
        }                         
      });
    }
  };
      
  function createContacts(data){
      jQuery("#showContacts").append(
        "<table id='contactTable' href='#'><tr><th></th><th>#</th><th>Vorname</th><th>Nachname</th><th>Firma</th><th>Email</th><th>Telefonnummer</th></tr></table>"
      );
      var json = $.parseJSON(data);
      var counter = 1;
      var dialogHTML = "";
      var tableContentHTML = "";
      // init table for overview
      jQuery("#ov_contacts").append("Kontakte<table id='ov_contactTable' href='#'><tr><th>Vorname</th><th>Nachname</th><th>Firma</th><th>Email</th></tr></table>");  
      //create/parse HTML  dialog and tableContent 
      while(json[counter]){
        var contactID = json[counter][counter][0];
        var firstname = json[counter][counter][1];
        var lastname = json[counter][counter][2];
        var company = json[counter][counter][3];
        var email = json[counter][counter][4];
        var tel = json[counter][counter][5];
        var note = json[counter][counter][6];
        dialogHTML += "<div id='dialog_c"+contactID+"' class='dialog'><form><fieldset><label for='f_firstname"+contactID+"'>Vorname</label><input type='text' name='firstname' id='f_firstname"+contactID+"' value='"+firstname+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_lastname"+contactID+"'>Nachname</label><input type='text' name='lastname' id='f_lastname"+contactID+"' value='"+lastname+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_company"+contactID+"'>Firma</label><input type='text' name='company' id='f_company"+contactID+"' value='"+company+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_email'>Email</label><input type='text' name='email' id='f_email"+contactID+"' value='"+email+"' class='text ui-widget-content ui-corner-all'><br /><label for='tel'>Telefonnummer</label><input type='tel' name='f_tel' id='f_tel"+contactID+"' value='"+tel+"' class='text ui-widget-content ui-corner-all'><br /><label for='note'>Notiz</label><br /><textarea name='note' id='f_note"+contactID+"' type='text' cols='40' rows='7' class='text ui-widget-content ui-corner-all'>"+note+"</textarea></fieldset></form></div>";
        tableContentHTML += "<tr><td><button id='btn_viewContact"+contactID+"' class='opener' data-id='#dialog_c"+contactID+"'>Bearbeiten</button><button id='btn_deleteContact"+contactID+"' class='btn_delete'>L&ouml;schen</button></td><td>"+counter+"</td><td>"+firstname+"</td><td>"+lastname+"</td><td>"+company+"</td><td>"+email+"</td><td>"+tel+"</td></tr>";
        counter++;
      };
      jQuery("#contactTable").append(tableContentHTML);
      jQuery("#showContacts").append(dialogHTML);
      counter = 1;
      while(json[counter]){
        //init button delete contact
        jQuery("#btn_deleteContact"+json[counter][counter][0]).click(function(){
              var id = $(this).attr('id');
              id = id.toString().substring(17, id.toString().length);
              jQuery.get("deleteContact.php",{
                cid: id 
              },function(data){
                 if(data == "1"){
                   updateContacts();
                   alert("Kontakt erfolgreich entfernt!");
                   console.log("Delete contact successfull!");
                 }else{
                   alert("Kontakt konnte nicht entfernt werden!");
                   console.log("Delete contact error!");    
                 }
              });
        });
        counter++;
      };  
      $(".dialog").dialog({
        autoOpen: false
      }); 
      $(".opener").click(function () {
        var id = $(this).data('id');
        var type = id.toString().substring(8, 9);
        if(type == "c"){
          var cid = id.toString().substring(9, id.toString().length);
          $(id).dialog({
            autoOpen: false,
            height: 600,
            width: 700,
            modal: true,
            title: "Kontakt anpassen", 
            buttons: {
                "Speichern": function(){
                    editContact(cid);
                    $(id).dialog('close');
                    }
                 },
                 close: function() {
                 }
          });
          $(id).dialog("open");
        }
      });
      // init contacts for overview
      var lastContact = Object.keys(json).length;
      var overviewHtml = "";
      if(lastContact < 5){
        for(var i = 0;i < lastContact ; i++){
          overviewHtml += "<tr><td>"+json[lastContact][lastContact][1]+"</td><td>"+json[lastContact][lastContact][2]+"</td><td>"+json[lastContact][lastContact][3]+"</td><td>"+json[lastContact][lastContact][4]+"</td></tr>";
          lastContact--;
        }
      } else {
        for(var i = 0;i < 5 ; i++){  
          overviewHtml += "<tr><td>"+json[lastContact][lastContact][1]+"</td><td>"+json[lastContact][lastContact][2]+"</td><td>"+json[lastContact][lastContact][3]+"</td><td>"+json[lastContact][lastContact][4]+"</td></tr>";
          lastContact--;
        };
      }
      jQuery("#ov_contactTable").append(overviewHtml);
  };
  
  function updateContacts(){
    jQuery.get("contacts.php",{},function(data){
      jQuery("#showContacts").empty();
      jQuery("#ov_contacts").empty();
      createContacts(data);
      console.log("Update Contacts successfull!");  
    });  
  };
  // init contacts, buttons and tab
  jQuery.get("contacts.php",{},function(data){
        //init functions panel
        jQuery("#contacts").append(
          "<div id='tabs_contacts'><ul><li><a href='#showContacts'>Kontakte anzeigen</a></li><li><a href='#createContact'>Kontakt erstellen</a></li></ul><div id='showContacts'></div><div id='createContact'></div></div>"
        );
        $(function() {
          $( "#tabs_contacts" ).tabs();
        });
        // init show all contacts
        createContacts(data);
        // init create contact form and button function
        jQuery("#createContact").append(
          "Vorname<input id='firstname' maxlength='40' type='text'></input>Nachname<input id='lastname' maxlength='40' type='text'></input>Firma<input id='firm' maxlength='40' type='text'></input><br/>EMail<input id='email' maxlength='40' type='email' placeholder='G&uuml;ltige E-Mail Adresse angeben!'></input>TelNr.<input id='tel' type='tel' maxlength='40'></input><br/>Notiz<br/><textarea id='note' type='text' cols='40' rows='7' maxlength='2000'></textarea><br/><button id='btn_createContact' class='btn_add'>Kontakt erstellen</button>"          
        );    
        jQuery("#btn_createContact").click(function(){
          if(!jQuery("#firstname").val() && !jQuery("#lastname").val() && !jQuery("#firm").val() && !jQuery("#email").val() && !jQuery("#tel").val()){
            alert("Bitte mindestens Vornamen/Nachnamen/Firma/Email oder Telefonnumer angeben!");
          }else{
            jQuery.get("createContact.php",{
              firstname : jQuery("#firstname").val(),
              lastname : jQuery("#lastname").val(),
              firm : jQuery("#firm").val(),
              email : jQuery("#email").val(),
              tel : jQuery("#tel").val(),
              note : jQuery("#note").val()
              },function(data){
                if(data == "1"){
                  jQuery("#firstname").val('');
                  jQuery("#lastname").val('');
                  jQuery("#firm").val('');
                  jQuery("#email").val('');
                  jQuery("#tel").val('');
                  jQuery("#note").val('');
                  updateContacts();
                  alert("Kontakt erfolgreich erstellt!");
                  console.log("Create contact successfull!");
                }else{
                  alert("Kontakt konnte nicht erstellt werden!");
                  console.log("ERROR: Create contact successfull!");
                }                         
            });
          }
      });
  });      
});