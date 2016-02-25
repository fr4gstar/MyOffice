jQuery(document).ready(function(){  
  function editTask(taskID, time){
    if(!jQuery("#t_title"+taskID).val() || jQuery("#t_title"+taskID).val().toString().length > 40 || jQuery("#t_description"+taskID).val().toString().length > 2000 || jQuery("#t_note"+taskID).val().toString().length > 2000){
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
      jQuery("#ov_tasks").append("Aufgaben<table id='ov_taskTable' href='#'><tr><th>Titel</th><th>Beschreibung</th><th>Zeit</th></tr></table>");
      jQuery("#showTasks").append(
        "<table id='taskTable' href='#'><tr><th></th><th>#</th><th>Titel</th><th>Beschreibung</th><th>Notiz</th><th>Ben&ouml;tigte Zeit</th></tr></table>"
      );
      var json = $.parseJSON(data);
      var counter = 0;
      var dialogHTML = "";
      var tableContentHTML = ""; 
      while(json[counter]){
        var taskID = json[counter]['id'];
        var title = json[counter]['title'];
        var descriptionTeaser = "";
        var description = json[counter]['description'];
        var descriptionTeaser = "";
        var note = json[counter]['note'];
        var noteTeaser = "";
        var elapsedTime = json[counter]['elapsedTime'];
        if(description.toString().length > 40){
          descriptionTeaser = description.toString().substring(0, 37);
          descriptionTeaser += "...";
        }else{
          descriptionTeaser = description;  
        }
        if(title.toString().length > 40){
          titleTeaser = title.toString().substring(0, 37);
          titleTeaser += "...";
        }else{
          titleTeaser = title;  
        }
        if(note.toString().length > 40){
          noteTeaser = note.toString().substring(0, 37);
          noteTeaser += "...";
        }else{
          noteTeaser = note;  
        }
        dialogHTML += "<div id='dialog_t"+taskID+"' class='dialog'><form><fieldset><label for='t_title'>Titel</label><input type='text' name='Titel' id='t_title"+taskID+"' maxlength='40' value='"+title+"' class='text ui-widget-content ui-corner-all'><br /><label for='t_description"+taskID+"'>Beschreibung</label><br /><textarea name='description' id='t_description"+taskID+"' type='text' cols='40' rows='5' maxlength='2000' class='text ui-widget-content ui-corner-all'>"+description+"</textarea><br /><label for='t_note"+taskID+"'>Notiz</label><br /><textarea name='note' id='t_note"+taskID+"' type='text' maxlength='2000' cols='40' rows='5' class='text ui-widget-content ui-corner-all'>"+note+"</textarea></fieldset></form><div id='timer"+taskID+"' class='timer'></div></div>";
        tableContentHTML += "<tr><td><button id='btn_viewTask"+taskID+"' class='opener' data-note='"+note+"' data-time='"+elapsedTime+"'data-id='#dialog_t"+taskID+"'>Bearbeiten</button><button id='btn_deleteTask"+taskID+"' class='btn_delete'>L&ouml;schen</button></td><td>"+counter+"</td><td>"+titleTeaser+"</td><td>"+descriptionTeaser+"</td><td>"+noteTeaser+"</td><td>"+elapsedTime+"</td></tr>";        
        counter++;
      };
      jQuery("#taskTable").append(tableContentHTML);
      jQuery("#showTasks").append(dialogHTML);
      counter = 0;
      while(json[counter]){
        //init button delete task
        jQuery("#btn_deleteTask"+json[counter]['id']).click(function(){
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
        var type = id.toString().substring(8, 9);
        if(type == "t"){
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
          $(id).dialog({
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
                      $(id).dialog('close');
                    }
                 },
                 close: function() {
                 }
          });
          $(id).dialog("open");
        }
      });
      // init overview task data
      var lastTask = Object.keys(json).length - 1;
      var overviewHtml = "";
      var descTeaser = "";
      if(lastTask < 5){
        for(var i = 0;i < lastTask ; i++){
          if(json[lastTask]['description'].toString().length > 20){
            descTeaser = json[lastTask]['description'].toString().substring(0, 20);
            descTeaser += "...";
          }else{
            descTeaser = json[lastTask]['description'];
          }  
          overviewHtml += "<tr><td>"+json[lastTask]['title']+"</td><td>"+descTeaser+"</td><td>"+json[lastTask]['elapsedTime']+"</td></tr>";
          lastTask--;
        };
      }else{
        for(var i = 0;i < 5 ; i++){
          if(json[lastTask]['description'].toString().length > 20){
            descTeaser = json[lastTask]['description'].toString().substring(0, 20);
            descTeaser += "...";
          }else{
            descTeaser = json[lastTask]['description'];
          }  
          overviewHtml += "<tr><td>"+json[lastTask]['title']+"</td><td>"+descTeaser+"</td><td>"+json[lastTask]['elapsedTime']+"</td></tr>";
          lastTask--;
        };
      }
      jQuery("#ov_taskTable").append(overviewHtml);    
  };
  
  function updateTasks(){
    jQuery.get("tasks.php",{},function(data){
      jQuery("#showTasks").empty();
      jQuery("#ov_tasks").empty();
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
          "Titel<input id='task_title' type='text' maxlength='40'></input><br/>Beschreibung<br/><textarea id='task_description' type='text' cols='40' rows='5' maxlength='2000'></textarea><br/><button id='btn_createTask' class='btn_add'>Aufgabe erstellen</button>"          
        );    
        jQuery("#btn_createTask").click(function(){
          if(!jQuery("#task_title").val() || jQuery("#task_title").val().toString().length > 40 || jQuery("#task_description").val().toString().length > 2000){
            alert("Titel(muss angegeben sein) oder Beschreibung zu lang!");
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