jQuery(document).ready(function(){  
  function editTask(taskID, time){
    if(!jQuery("#t_title"+taskID).val()){
      alert("Bitte den Titel angeben!");
    }else{
      // check and convert time
      var hours = "00";
      var minutes = "00";
      var seconds = "00";
      if((time/60/60) >= 1){
        hours = parseInt((time/60/60));  
      }
      if((time/60) >= 1){
        minutes = time - parseInt(hours*60*60);
        minutes = parseInt(minutes/60);  
      }
      seconds = time - (parseInt(hours)*60*60) - (parseInt(minutes)*60); 
      time = hours+":"+minutes+":"+seconds;
      console.log(time);
        jQuery.get("editTask.php",{
          tid : taskID,
          title : jQuery("#t_title"+taskID).val(),
          description : jQuery("#t_description"+taskID).val(),
          note : jQuery("#t_note"+taskID).val(), 
          elapsedTime : time
          },function(data){
          if(data == "1"){
            updateTasks();
            alert("Aufgabe erfolgreich angepasst!");
            console.log("Edit task successfull!");
          }else{
            updateTasks();
            alert("Aufgabe konnte nicht angepasst werden!");
            console.log("ERROR: Edit task failed!");
          }                         
        });
    }
  };
      
  function createTasks(data){
      jQuery("#showTasks").append(
        "<table id='taskTable' href='#'><tr><th></th><th>Titel</th><th>Beschreibung</th><th>Notiz</th><th>Ben&ouml;tigte Zeit</th></tr></table>"
      );
      var json = $.parseJSON(data);
      var counter = 1;
      var dialogHTML = "";
      var tableContentHTML = ""; 
      while(json[counter]){
        var taskID = json[counter][counter][0];
        var title = json[counter][counter][1];
        var description = json[counter][counter][2];
        var descriptionTeaser = "";
        var note = json[counter][counter][3];
        var noteTeaser = "";
        var elapsedTime = json[counter][counter][4];
        if(description.toString().length > 40){
          descriptionTeaser = description.toString().substring(0, 37);
          descriptionTeaser += "...";
        }else{
          descriptionTeaser = description;  
        }
        if(note.toString().length > 40){
          noteTeaser = note.toString().substring(0, 37);
          noteTeaser += "...";
        }else{
          noteTeaser = note;  
        }
        dialogHTML += "<div id='dialog_t"+taskID+"' class='dialog'><form><fieldset><label for='t_title'>Titel</label><input type='text' name='Titel' id='t_title"+taskID+"' value='"+title+"' class='text ui-widget-content ui-corner-all'><br /><label for='t_description"+taskID+"'>Beschreibung</label><br /><textarea name='description' id='t_description"+taskID+"' type='text' cols='40' rows='5' class='text ui-widget-content ui-corner-all'>"+description+"</textarea><br /><label for='t_note"+taskID+"'>Notiz</label><br /><textarea name='note' id='t_note"+taskID+"' type='text' cols='40' rows='5' class='text ui-widget-content ui-corner-all'>"+note+"</textarea><input type='submit' tabindex='-1' style='position:absolute; top:-1000px'></fieldset></form><div id='timer"+taskID+"' class='timer'></div></div>";
        tableContentHTML += "<tr><td><button id='btn_viewTask"+taskID+"' class='opener' data-note='"+note+"' data-time='"+elapsedTime+"'data-id='#dialog_t"+taskID+"'>Bearbeiten</button><button id='btn_deleteTask"+taskID+"' class='btn_delete'>L&ouml;schen</button></td><td>"+title+"</td><td>"+descriptionTeaser+"</td><td>"+note+"</td><td>"+elapsedTime+"</td></tr>";        
        counter++;
      };
      jQuery("#taskTable").append(tableContentHTML);
      jQuery("#showTasks").append(dialogHTML);
      counter = 1;
      while(json[counter]){
        //init button delete task
        jQuery("#btn_deleteTask"+json[counter][counter][0]).click(function(){
              var id = $(this).attr('id');
              id = id.toString().substring(14, id.toString().length);
              jQuery.get("deleteTask.php",{
                tid: id 
              },function(data){
                 if(data == "1"){
                   updateTasks();
                   alert("Aufgabe erfolgreich entfernt!");
                   console.log("Delete task successfull!");
                 }else{
                   alert("Aufgabe konnte nicht entfernt werden!");
                   console.log("Delete task error!");    
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
        var tid = id.toString().substring(9, id.toString().length);
        var note = $(this).data('note');
        // init timer at dialog
        var clock = $('#timer'+tid).FlipClock({
          autoStart: false,
          language: 'de'
        });
        var time = $(this).data('time');
        var seconds;
        if(time != "00:00:00"){
          var a = time.split(':');
          seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);      
        }else{
          seconds = 0;
        }
        clock.setTime(seconds);        
        $(".dialog").dialog({
          autoOpen: false,
          height: 700,
          width: 700,
          modal: true,
          title: "Aufgabe #"+tid+" anpassen", 
          buttons: {
              "Start": function(){
                    clock.start();     
                  },
              "Stop": function(){
                    clock.stop();
                  },
              "Reset": function(){
                    alert("Hinweis: Die bereits verstrichene Zeit wird auf 00:00:00 gesetzt - Fenster schliessen um abzubrechen!");
                    clock.reset();
                  },    
              "Speichern": function(){
                    editTask(tid, clock.getTime().time);
                    $(".dialog").dialog('close');
                  }
               },
               close: function() {
               }
        });
        $(id).dialog("open");
      });
      // init overview task data
      var lastTask = Object.keys(json).length;
      var overviewHtml = "";
      var descTeaser = "";
      if(lastTask < 5){
        for(var i = 0;i < lastTask ; i++){
          if(json[lastTask][lastTask][2].toString().length > 20){
            descTeaser = json[lastTask][lastTask][2].toString().substring(0, 20);
            descTeaser += "...";
          }else{
            descTeaser = json[lastTask][lastTask][2];
          }  
          overviewHtml += "<tr><td>"+json[lastTask][lastTask][1]+"</td><td>"+descTeaser+"</td><td>"+json[lastTask][lastTask][4]+"</td></tr>";
          lastTask--;
        };
      }else{
        for(var i = 0;i < 5 ; i++){
          if(json[lastTask][lastTask][2].toString().length > 20){
            descTeaser = json[lastTask][lastTask][2].toString().substring(0, 20);
            descTeaser += "...";
          }else{
            descTeaser = json[lastTask][lastTask][2];
          }  
          overviewHtml += "<tr><td>"+json[lastTask][lastTask][1]+"</td><td>"+descTeaser+"</td><td>"+json[lastTask][lastTask][4]+"</td></tr>";
          lastTask--;
        };
      }
      jQuery("#ov_taskTable").append(overviewHtml);    
  };
  
  function updateTasks(){
    jQuery.get("tasks.php",{},function(data){
      jQuery("#showTasks").empty();
      jQuery("#ov_taskTable").empty();
      createTasks(data);
      console.log("Update task successfull!");  
    });  
  };
  // init tasks, buttons and tab
  jQuery.get("tasks.php",{},function(data){
        //init functions panel + timer
        jQuery("#tasks").append(
          "<div id='tabs_tasks'><ul><li><a href='#showTasks'>Aufgaben anzeigen</a></li><li><a href='#createTask'>Aufgabe erstellen</a></li></ul><div id='showTasks'></div><div id='createTask'></div></div>"
        );
        $(function() {
          $( "#tabs_tasks" ).tabs();
        });
        // init show all tasks
        createTasks(data);
        // init create task form and button function
        jQuery("#createTask").append(
          "Titel<input id='task_title' type='text'></input><br/>Beschreibung<br/><textarea id='task_description' type='text' cols='40' rows='5'></textarea><br/><button id='btn_createTask' class='btn_add'>Aufgabe erstellen</button>"          
        );    
        jQuery("#btn_createTask").click(function(){
          if(!jQuery("#task_title").val()){
            alert("Bitte den Titel angeben!");
          }else{
            jQuery.get("createTask.php",{
              title : jQuery("#task_title").val(),
              description : jQuery("#task_description").val()
              },function(data){
                if(data == "1"){
                  jQuery("#task_title").val('');
                  jQuery("#task_description").val('');
                  updateTasks();
                  alert("Aufgabe erfolgreich erstellt!");
                  console.log("Create task successfull!");
                }else{
                  alert("Aufgabe konnte nicht erstellt werden!");
                  console.log("ERROR: Create task successfull!");
                }                         
            });
          }
      });
  });      
});