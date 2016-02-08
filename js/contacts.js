jQuery(document).ready(function(){
  function updateContacts(){
    jQuery.get("contacts.php",{},function(data){
      jQuery("#showContacts").empty();
      jQuery("#showContacts").append(
        "<table id='contactTable' href='#'><tr><th></th><th>ID</th><th>Vorname</th><th>Nachname</th><th>Firma</th><th>Email</th><th>TelNr.</th></tr></table>"
      );
      var json = $.parseJSON(data);
      var counter = 1;
      while(json[counter]){
        jQuery("#contactTable").append(
          "<tr><td><button id='btn_viewContact"+json[counter][counter][0]+"'>*</button><button id='btn_deleteContact"+json[counter][counter][0]+"'>-</button><button id='btn_editContact"+json[counter][counter][0]+"'>/</button></td><td>"+json[counter][counter][0]+"</td><td>"+json[counter][counter][1]+"</td><td>"+json[counter][counter][2]+"</td><td>"+json[counter][counter][3]+"</td><td>"+json[counter][counter][4]+"</td><td>"+json[counter][counter][5]+"</td></tr>"
        );
        //init button delete contact
        var contactID = parseInt(json[counter][counter][0]);
        jQuery("#btn_deleteContact"+json[counter][counter][0]).click(function(){
            jQuery.get("deleteContact.php",{
              cid: contactID  
            },function(data){
              console.log(data);
               if(data == "1"){
                 updateContacts();
                 alert("Kontakt erfolgreich gelöscht!");
                 console.log("Delete contact successfull!");
               }else{
                 alert("Kontakt konnte nicht gelöscht werden!");
                 console.log("Delete contact error!");    
               }
            });      
          });
          //init button edit contact
          jQuery("#btn_editContact"+json[counter][counter][0]).click(function(){
          if(!jQuery("#firstname").val() && !jQuery("#lastname").val() && !jQuery("#firm").val() && !jQuery("#email").val() && !jQuery("#tel").val()){
            alert("Bitte mindestens Vornamen/Nachnamen/Firma/Email oder Telefonnumer angeben!");
          }else{
            jQuery.get("editContact.php",{
              cid : contactID,
              firstname : jQuery("#firstname").val(),
              lastname : jQuery("#lastname").val(),
              firm : jQuery("#firm").val(),
              email : jQuery("#email").val(),
              tel : jQuery("#tel").val(),
              note : jQuery("#note").val()
              },function(data){
                if(data == "1"){
                  updateContacts();
                  alert("Kontakt erfolgreich geändert!");
                  console.log("Edit contact successfull!");
                }else{
                  alert("Kontakt konnte nicht verändert werden!");
                  console.log("ERROR: Edit contact successfull!");
                }                         
            });
          }
        });    
        counter++;
      }
      console.log("Update Contacts successfull!");  
    });  
  };
  jQuery.get("contacts.php",{},function(data){
        //init functions panel
        jQuery("#contacts").append(
          "<div id='tabs_contacts'><ul><li><a href='#showContacts'>Kontakte anzeigen</a></li><li><a href='#createContact'>Kontakt erstellen</a></li></ul><div id='showContacts'></div><div id='createContact'></div></div>"
        );
        $(function() {
          $( "#tabs_contacts" ).tabs();
        });
        // show Contacts tab
        jQuery("#showContacts").append(
          "<table id='contactTable' href='#'><tr><th></th><th>ID</th><th>Vorname</th><th>Nachname</th><th>Firma</th><th>Email</th><th>TelNr.</th></tr></table>"
        );
        var json = $.parseJSON(data);
        var counter = 1;
        while(json[counter]){
          jQuery("#contactTable").append(
            "<tr id='row_editContact"+json[counter][counter][0]+"'></td><td><button id='btn_viewContact"+json[counter][counter][0]+"'>*</button><button id='btn_deleteContact"+json[counter][counter][0]+"'>-</button><button id='btn_editContact"+json[counter][counter][0]+"'>/</button><td>"+json[counter][counter][0]+"</td><td>"+json[counter][counter][1]+"</td><td>"+json[counter][counter][2]+"</td><td>"+json[counter][counter][3]+"</td><td>"+json[counter][counter][4]+"</td><td>"+json[counter][counter][5]+"</td><tr>"
          );
          // delete contact
          var contactID = parseInt(json[counter][counter][0]);
          jQuery("#btn_deleteContact"+json[counter][counter][0]).click(function(){
            jQuery.get("deleteContact.php",{
              cid: contactID  
            },function(data){
               if(data == "1"){
                 updateContacts();
                 alert("Kontakt erfolgreich gelöscht!");
                 console.log("Delete contact successfull!");
               }else{
                 alert("Kontakt konnte nicht gelöscht werden!");
                 console.log("Delete contact error!");    
               }
            });      
          });
          // edit contact
          /*jQuery("#btn_editContact"+json[counter][counter][0]).click(function(){
            
            if(jQuery("#row_editContact"+json[counter][counter][0]).is("contenteditable='true'")){
              
            }
            console.log(jQuery("#firstname").val());
            if(!jQuery("#firstname").val() && !jQuery("#lastname").val() && !jQuery("#firm").val() && !jQuery("#email").val() && !jQuery("#tel").val()){
              alert("Bitte mindestens Vornamen/Nachnamen/Firma/Email oder Telefonnumer angeben!");
            }else{
              jQuery.get("editContact.php",{
                cid : contactID,
                firstname : jQuery("#firstname").val(),
                lastname : jQuery("#lastname").val(),
                firm : jQuery("#firm").val(),
                email : jQuery("#email").val(),
                tel : jQuery("#tel").val(),
                note : jQuery("#note").val()
                },function(data){
                  if(data == "1"){
                    updateContacts();
                    alert("Kontakt erfolgreich geändert!");
                    console.log("Edit contact successfull!");
                  }else{
                    alert("Kontakt konnte nicht verändert werden!");
                    console.log("ERROR: Edit contact successfull!");
                  }                         
              });
            }
          });*/
          counter++;                                                             
        }
        // create contact
        jQuery("#createContact").append(
          "Vorname<input id='firstname' type='text'></input>Nachname<input id='lastname' type='text'></input>Firma<input id='firm' type='text'></input><br/>EMail<input id='email' type='email'></input>TelNr.<input id='tel' type='tel'></input><br/>Notiz<br/><textarea id='note' type='text' cols='40' rows='5'></textarea><br/><button id='btn_createContact'>Kontakt erstellen</button>"          
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