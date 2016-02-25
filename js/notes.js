jQuery(document).ready(function(){
  function editNote(noteID){
    if(!jQuery("#f_title"+noteID).val()){
      alert("Bitte mindestens einen Titel angeben!");
    }else{
      jQuery.get("editNote.php",{
        nid : noteID,
        title : jQuery("#f_title"+noteID).val(),
        description : jQuery("#f_description"+noteID).val()
        },function(data){
        if(data == "1"){
          updateNotes();
          alert("Notiz erfolgreich angepasst!");
          console.log("Edit note successfull!");
        }else{
          updateNotes();
          alert("Notiz konnte nicht angepasst werden!");
          console.log("ERROR: Edit note failed!");
        }                         
      });
    }
  };
  function updateNotes(){
    jQuery.get("Notes.php",{},function(data){
      jQuery("#showNotes").empty();
      jQuery("#ov_notes").empty();
      //$(".opener").click(false);
      createNotes(data);
      console.log("Update notes successfull!");  
    });  
  };
  function createNotes(data){
    var json = $.parseJSON(data);
    var counter = 1;
    var dialogHTML = "";
    var notePanelContentHTML = "";
    // show notes tab
    jQuery("#showNotes").append(
      "<div id='notesPanel'></div>"
    );
    jQuery("#notesPanel").append(
      "<div class='column'></div>"
    );
    // init table for overview
    jQuery("#ov_notes").append("Notizen<table id='ov_noteTable' href='#'><tr><th>Titel</th><th>Beschreibung</th></tr></table>");  
    while(json[counter]){
      var nid = json[counter][counter][0];
      var title = json[counter][counter][1];
      var title_teaser = "";
      var description = json[counter][counter][2];
      var teaser = "";
      if(title.toString().length > 15){
        title_teaser = title.toString().substring(0, 15)
        title_teaser += "...";
      }else{
        title_teaser = title;
      }
      if(description.toString().length > 50){
        teaser = description.toString().substring(0, 50);
        teaser += "...";
      }else{
        teaser = description;
      }
      dialogHTML += "<div id='dialog_n"+nid+"' class='dialog'><form><fieldset><label for='f_title"+nid+"'>Titel</label><input type='text' maxlength='40' name='title' id='f_title"+nid+"' value='"+title+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_description"+nid+"'>Beschreibung</label><br /><textarea name='note' id='f_description"+nid+"' type='text' maxlength='2000' cols='40' rows='15' class='text ui-widget-content ui-corner-all'>"+description+"</textarea></fieldset></form></div>"; 
      notePanelContentHTML += "<div class='portlet'><div class='portlet-header'><button id='btn_editNote"+nid+"' data-id='#dialog_n"+nid+"' class='opener btn_edit notes'>*</button><button id='btn_deleteNote"+nid+"' class='btn_delete notes'>-</button><div>"+title_teaser+"</div></div><div class='portlet-content'>"+teaser+"</div></div>"
      counter++;                                                             
    };
    jQuery(".column").append(notePanelContentHTML);
    jQuery("#showNotes").append(dialogHTML);
    counter = 1;
    // init delete note
    while(json[counter]){
      jQuery("#btn_deleteNote"+json[counter][counter][0]).click(function(){
          var id = $(this).attr('id');
          id = id.toString().substring(14, id.toString().length);
          jQuery.get("deleteNote.php",{
            nid: id  
          },function(data){
             if(data == "1"){
               updateNotes();
               alert("Notiz erfolgreich entfernt!");
               console.log("Delete note successfull!");
             }else{
               alert("Notiz konnte nicht entfernt werden!");
               console.log("Delete note error!");    
             }
          });      
        });
        counter ++;
    };
    // init portlets
    $(function() {
        $( ".column" ).sortable({
          connectWith: ".column",
          handle: ".portlet-header",
          placeholder: "portlet-placeholder ui-corner-all"
        });
        $( ".portlet" )
          .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
          .find( ".portlet-header" )
            .addClass( "ui-widget-header ui-corner-all" );
      }
    );
    // init dialog forms
    $(".dialog").dialog({
        autoOpen: false
    }); 
    $(".opener").click(function () {
      var id = $(this).data('id');
      var type = id.toString().substring(8, 9);
      if(type == "n"){
        var nid = id.toString().substring(9, id.toString().length);
        $(id).dialog({
          autoOpen: false,
          height: 600,
          width: 700,
          modal: true,
          title: "Notiz anpassen", 
          buttons: {
              "Speichern": function(){
                  editNote(nid);
                  $(id).dialog('close');
                  }
               },
               close: function() {
               }
        });
        $(id).dialog("open");
      }
    });
    // init note data for overview
    var lastNote = Object.keys(json).length;
    var overviewHtml = "";
    var descTeaser = "";
    if(lastNote < 5){
      for(var i = 0;i < lastNote ; i++){
         if(json[lastNote][lastNote][2].toString().length > 20){
          descTeaser = json[lastNote][lastNote][2].toString().substring(0, 20);
          descTeaser += "...";
        }else{
          descTeaser = json[lastNote][lastNote][2];
        }  
        overviewHtml += "<tr><td>"+json[lastNote][lastNote][1]+"</td><td>"+descTeaser+"</td></tr>";
        lastNote--;
      };
    } else {
      for(var i = 0;i < 5 ; i++){
         if(json[lastNote][lastNote][2].toString().length > 20){
          descTeaser = json[lastNote][lastNote][2].toString().substring(0, 20);
          descTeaser += "...";
        }else{
          descTeaser = json[lastNote][lastNote][2];
        }  
        overviewHtml += "<tr><td>"+json[lastNote][lastNote][1]+"</td><td>"+descTeaser+"</td></tr>";
        lastNote--;
      };
    }
    jQuery("#ov_noteTable").append(overviewHtml);
  };
  jQuery.get("notes.php",{},function(data){
        //init functions panel
        jQuery("#notes").append(
          "<div id='tabs_notes'><ul><li><a href='#showNotes'>Notizen anzeigen</a></li><li><a href='#createNote'>Notiz erstellen</a></li></ul><div id='showNotes'></div><div id='createNote'></div></div>"
        );
        $(function() {
          $( "#tabs_notes" ).tabs();
        });
        createNotes(data);
        // create note tab
        jQuery("#createNote").append(
          "Titel<input id='title' maxlength='40' type='text'><br/>Beschreibung<br/><textarea id='description' type='text' maxlength='2000' cols='40' rows='15'></textarea><br/><button id='btn_createNote' class='btn_add'>Notiz erstellen</button>"          
        );
        jQuery("#btn_createNote").click(function(){
          if(!jQuery("#title").val()){
            alert("Bitte Titel angeben!");
          }else{
            jQuery.get("createNote.php",{
              title : jQuery("#title").val(),
              description : jQuery("#description").val()
              },function(data){
                if(data == "1"){
                  jQuery("#title").val('');
                  jQuery("#description").val('');
                  updateNotes();
                  alert("Notiz erfolgreich erstellt!");
                  console.log("Create note successfull!");
                }else{
                  alert("Notiz konnte nicht erstellt werden!");
                  console.log("ERROR: Create note successfull!");
                }                         
            });
          }
      });
  });      
});