jQuery(document).ready(function(){
  function updateNotes(){
    jQuery.get("Notes.php",{},function(data){
      jQuery("#showNotes").empty();
     // show notes tab
        jQuery("#showNotes").append(
          "<div id='notesPanel'></div>"
        );
        var json = $.parseJSON(data);
        var counter = 1;
        while(json[counter]){
          jQuery("#notesPanel").append(
          "<div class='portlet'><div class='portlet-header'>"+json[counter][counter][0]+"#"+json[counter][counter][1]+"</div><div class='portlet-content'>"+json[counter][counter][1]+"</div></div>"
          );
          
        $(function() {
          
          $( ".column" ).sortable({
            connectWith: ".column",
            handle: ".portlet-header",
            cancel: ".portlet-toggle",
            placeholder: "portlet-placeholder ui-corner-all"
          });
       
          $( ".portlet" )
            .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
            .find( ".portlet-header" )
              .addClass( "ui-widget-header ui-corner-all" )
              .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
          
          $( ".portlet-toggle" ).click(function() {
            var icon = $( this );
            icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
            icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
          });
        });
        
        
        
        //init button delete Note
        var NoteID = parseInt(json[counter][counter][0]);
        jQuery("#btn_deleteNote"+json[counter][counter][0]).click(function(){
            jQuery.get("deleteNote.php",{
              cid: NoteID  
            },function(data){
              console.log(data);
               if(data == "1"){
                 updateNotes();
                 alert("Kontakt erfolgreich gelöscht!");
                 console.log("Delete Note successfull!");
               }else{
                 alert("Kontakt konnte nicht gelöscht werden!");
                 console.log("Delete Note error!");    
               }
            });      
          });  
        counter++;
      }
      console.log("Update notes successfull!");  
    });  
  };
  jQuery.get("notes.php",{},function(data){
        //init functions panel
        jQuery("#notes").append(
          "<div id='tabs_notes'><ul><li><a href='#showNotes'>Notizen anzeigen</a></li><li><a href='#createNote'>Notiz erstellen</a></li></ul><div id='showNotes'></div><div id='createNote'></div></div>"
        );
        $(function() {
          $( "#tabs_notes" ).tabs();
        });
        
        // show notes tab
        jQuery("#showNotes").append(
          "<div id='notesPanel'></div>"
        );
        var json = $.parseJSON(data);
        var counter = 1;
        jQuery("#notesPanel").append("<div class='column'>");
        while(json[counter]){
          if(counter%4 == 0){
           console.log(counter);
            jQuery("#notesPanel").append("<div class='column'>");
            jQuery("#notesPanel").append(
              "<div class='portlet'><div class='portlet-header'>"+json[counter][counter][0]+"#"+json[counter][counter][1]+"</div><div class='portlet-content'>"+json[counter][counter][2]+"</div></div>"
            );
            jQuery("#notesPanel").append("</div>");    
          }else{
            jQuery("#notesPanel").append(
              "<div class='portlet'><div class='portlet-header'>"+json[counter][counter][0]+"#"+json[counter][counter][1]+"</div><div class='portlet-content'>"+json[counter][counter][2]+"</div></div>"
            );
          }
        $(
          function() {
            
            $( ".column" ).sortable({
              connectWith: ".column",
              handle: ".portlet-header",
              cancel: ".portlet-toggle",
              placeholder: "portlet-placeholder ui-corner-all"
            });
            $( ".portlet" )
              .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
              .find( ".portlet-header" )
                .addClass( "ui-widget-header ui-corner-all" )
                .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
         
            $( ".portlet-toggle" ).click(function() {
              var icon = $( this );
              icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
              icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
            });
          }
        );  
          // delete note
          var noteID = parseInt(json[counter][counter][0]);
          jQuery("#btn_deleteNote"+json[counter][counter][0]).click(function(){
            jQuery.get("deleteNote.php",{
              nid: noteID  
            },function(data){
               if(data == "1"){
                 updateNotes();
                 alert("Notiz erfolgreich gelöscht!");
                 console.log("Delete note successfull!");
               }else{
                 alert("Notiz konnte nicht gelöscht werden!");
                 console.log("Delete note error!");    
               }
            });      
          });
          counter++;                                                             
        }
        // create note
        jQuery("#createNote").append(
          "Titel<input id='title' type='text'><br/>Beschreibung<br/><textarea id='description' type='text' cols='40' rows='5'></textarea><br/><button id='btn_createNote'>Notiz erstellen</button>"          
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