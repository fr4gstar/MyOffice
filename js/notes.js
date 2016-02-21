jQuery(document).ready(function(){
  function updateNotes(){
    jQuery.get("Notes.php",{},function(data){
      jQuery("#showNotes").empty();
      createNotes(data);
      console.log("Update notes successfull!");  
    });  
  };
  function createNotes(data){
    var json = $.parseJSON(data);
    var counter = 1;
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
      // show notes tab
      jQuery("#showNotes").append(
        "<div id='notesPanel'></div>"
      ); 
      jQuery("#notesPanel").append(
        "<div class='column'><div class='portlet'><div class='portlet-header'><button id='btn_deleteNote"+nid+"' class='btn_delete notes'>-</button>"+title_teaser+"</div><div class='portlet-content'>"+teaser+"</div></div></div>"
      );
      // delete note
      jQuery("#btn_deleteNote"+nid).click(function(){
          var id = $(this).attr('id');
          id = id.toString().substring(14, id.toString().length);
          console.log(id);
          jQuery.get("deleteNote.php",{
            nid: id  
          },function(data){
             console.log(data);
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
      counter++;                                                             
    }
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
            //.prepend ("<button id='btn_deleteNote' class='btn_delete notes'>-</button>")
            //.prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>")
            ;
        $( ".portlet-toggle" ).click(function() {
          var icon = $( this );
          icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
          icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
        });
      }
    );
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
        // create note
        jQuery("#createNote").append(
          "Titel<input id='title' type='text'><br/>Beschreibung<br/><textarea id='description' type='text' cols='40' rows='5'></textarea><br/><button id='btn_createNote' class='btn_add'>Notiz erstellen</button>"          
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