jQuery(document).ready(function(){
  var event = [];
  jQuery.datetimepicker.setLocale('de');
  jQuery("#calendar").append("<div id='fullcal'><div>");
  $("#fullcal").fullCalendar({
      dayClick: function(date, jsEvent, view) {
        $('#createEventDialog').dialog({
          autoOpen: false,
          height: 600,
          width: 700,
          modal: true,
          title: "Event erstellen",
          open: function(){
            jQuery("#createEventStart").val(date);
            jQuery("#createEventEnd").val(date);
            jQuery("#createEventStart").datetimepicker({
                  startDate: new Date()
            });
            jQuery("#createEventEnd").datetimepicker({
                  startDate: date
            });   
          }, 
          buttons: {
              "Erstellen": function(){
                  createEvent();
                  $('#createEventDialog').dialog('close');
                  }
               },                                                
               close: function() {
               }
        });
        $('#createEventDialog').dialog('open');
        jQuery("#createEventTitle").val('Neues Event');  
      },
      eventClick: function(calEvent, jsEvent, view) {
        var id = calEvent.id;
        $('#dialog_e'+id).dialog({
          autoOpen: false,
          height: 600,
          width: 700,
          modal: true,
          title: "Event #"+ id+" anpassen",
          open: function(){
            jQuery("#e_start"+id).datetimepicker({
                  startDate: calEvent.start
            });
            jQuery("#e_end"+id).datetimepicker({
                  startDate: calEvent.end
            });
            jQuery("#e_start"+id).val(calEvent.start);
            jQuery("#e_end"+id).val(calEvent.end);   
          }, 
          buttons: {
              "Speichern": function(){
                  if(editEvent(id)){
                    calEvent.remove;      
                  }
                  $('#dialog_e'+id).dialog('close');
                },
              "Entfernen": function(){
                  jQuery.get("deleteCalendar.php",{
                      eid : calEvent.id
                      },function(data){
                        if(data == "1"){
                          $("#fullcal").fullCalendar('removeEvents', calEvent.id);
                          updateEvents();
                          alert("Kontakt erfolgreich erstellt!");
                          console.log("Create contact successfull!");
                        }else{
                          alert("Kontakt konnte nicht erstellt werden!");
                          console.log("ERROR: Create contact successfull!");
                        }
                       $('#dialog_e'+id).dialog('close');                         
                    });
                  }
               },  
               close: function() {
               }
        });
        //jQuery("#e_start"+id).datetimepicker();
        //jQuery("#e_end"+id).datetimepicker();
        $('#dialog_e'+id).dialog('open');
      },
      weekends: true,
      aspectRatio: 2,
      editable: false,
      defaultDate: new Date(),
      left:   '',
      center: '',
      right:  'today prev,next',
      eventSources: 
        [{
          url: 'calendar.php',
          type: 'POST',
          error: function() {
              alert('There was an error while fetching events!');
          }
        }]
  });

  function createEvent(date){
    if(!$("#createEventTitle").val() && !$("#createEventStart").val() && !$("#createEventEnd").val()){
      alert("Bitte mindestens Titel, Start- und Enddatum (und Zeit) angeben!");
    }else{
      $.get("createCalendar.php",{
        title : $("#createEventTitle").val(),
        description : $("#createEventDescription").val(),
        start : $("#createEventStart").val(),
        end : $("#createEventEnd").val()
        },function(data){
        var event = {
            title : $("#createEventTitle").val(),
            description : $("#createEventDescription").val(),
            start : $("#createEventStart").val(),
            end : $("#createEventEnd").val()
        };
        if(data == "1"){
          updateEvent(event);
          $("#fullcal").fullCalendar('renderEvent', event);
          alert("Event erfolgreich erstellt!");
          console.log("Add event successfull!");
          return true;
        }else{
          updateEvents();
          alert("Event konnte nicht erstellt werden!");
          console.log("ERROR: Add event failed!");
          return false;
        }                        
      });
    }  
  };
    
  $.get("calendar.php",{},function(data){
        $("#overview").append("<div id='ov_nextEvents' class='ov_header'>Demn&auml;chst anstehende Termine</div><div id='ov_events'></div>");        
        createEvents(data);   
    });
    
  function editEvent(eventID){
    if(!$("#e_title"+eventID).val() || !$("#e_start"+eventID).val() || !$("#e_end"+eventID).val()){
      alert("Bitte mindestens Titel, Start und Ende angeben!");
    }else{
      $.get("editCalendar.php",{
        eid : eventID,
        title : $("#e_title"+eventID).val(),
        description : $("#e_description"+eventID).val(),
        start : $("#e_start"+eventID).val(),
        end : $("#e_end"+eventID).val()
        },function(data){
        var tempEvent = {
          eid : eventID,
          title : $("#e_title"+eventID).val(),
          description : $("#e_description"+eventID).val(),
          start : $("#e_start"+eventID).val(),
          end : $("#e_end"+eventID).val()  
        };
        if(data == "1"){
          $("#fullcal").fullCalendar('renderEvent', tempEvent);
          $("#fullcal").fullCalendar('removeEvents', tempEvent.eid);
          updateEvent(tempEvent);
          alert("Event erfolgreich angepasst!");
          console.log("Edit event successfull!");
          return true;
        }else{
          updateEvents();
          alert("Event konnte nicht angepasst werden!");
          console.log("ERROR: Edit event failed!");
          return false;
        }                         
      });
    }
  };
  
  function updateEvents(){
    $.get("calendar.php",{},function(data){
      $("#ov_events").empty();
      createEvents(data);
      //$("#fullcal").fullCalendar('rerenderEvents');
      console.log("Update events successfull!");  
    });  
  };
  
  function updateEvent(event){
    $.get("calendar.php",{},function(data){
      $("#ov_events").empty();
      var id = event.eid;
      var title = event.title;
      var description = event.description;
      var start = event.start;
      var end = event.end;
      $("#fullcal").append(
        "<div id='dialog_e"+id+"' class='dialog'><form><fieldset><label for='e_title"+id+"'>Title</label><input type='text' name='start' id='e_title"+id+"' value='"+title+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_start"+id+"'>Start</label><input type='text' name='start' id='e_start"+id+"' value='"+start+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_end"+id+"'>Ende</label><input type='text' name='end' id='e_end"+id+"' value='"+end+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_description"+id+"'>Beschreibung</label><br /><textarea name='note' id='e_description"+id+"' type='text' cols='40' rows='7' class='text ui-widget-content ui-corner-all'>"+description+"</textarea></fieldset></form></div>"    
      );
      createEvents(data);
      console.log("Update events successfull!");  
    });  
  };
          
  function createEvents(data){
      $("#ov_events").append("<table id='ov_eventTable' href='#'><tr><th>F&auml;llig in</th><th>Titel</th><th>Beschreibung</th><th>Start</th><th>Ende</th></tr></table>");
      var json = $.parseJSON(data);
      var counter = 0;
      var dialogHTML = "";
      var dueTime = [];
      dialogHTML += "<div id='createEventDialog' class='dialog'><form><fieldset><label for='createEventTitle'>Title</label><input type='text' name='createEventTitle' id='createEventTitle' value='' class='text ui-widget-content ui-corner-all'><br /><label for='createEventStart"+id+"'>Start</label><input type='text' name='start' id='createEventStart' value='' class='text ui-widget-content ui-corner-all'><br /><label for='createEventEnd'>Ende</label><input type='text' name='createEventEnd' id='createEventEnd' value='' class='text ui-widget-content ui-corner-all'><br /><label for='createEventDescription'>Beschreibung</label><br /><textarea name='createEventDescription' id='createEventDescription' type='text' cols='40' rows='7' class='text ui-widget-content ui-corner-all'></textarea></fieldset></form></div>"; 
      //init events
      while(json[counter]){
          var tempEvent;
          var id = json[counter]['id'];
          var title = json[counter]['title'];
          var description = json[counter]['description'];
          var start = json[counter]['start'].split(/[- :]/);
          start = new Date(start[0], start[1]-1, start[2], start[3], start[4], start[5]);
          var end = json[counter]['end'].split(/[- :]/);
          end = new Date(end[0], end[1]-1, end[2], end[3], end[4], end[5]);
          dialogHTML += "<div id='dialog_e"+id+"' class='dialog'><form><fieldset><label for='e_title"+id+"'>Title</label><input type='text' name='start' id='e_title"+id+"' value='"+title+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_start"+id+"'>Start</label><input type='text' name='start' id='e_start"+id+"' value='"+start+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_end"+id+"'>Ende</label><input type='text' name='end' id='e_end"+id+"' value='"+end+"' class='text ui-widget-content ui-corner-all'><br /><label for='e_description"+id+"'>Beschreibung</label><br /><textarea name='note' id='e_description"+id+"' type='text' cols='40' rows='7' class='text ui-widget-content ui-corner-all'>"+description+"</textarea></fieldset></form></div>";
          dueTime[id] = (start - new Date());
          if(dueTime[id].toString().substring(0, 1) == "-"){
            dueTime[id] = dueTime[id]/60/60/60;
            dueTime[id] = "-"+dueTime[id];
          }else{
            dueTime[id] = dueTime[id]/60/60/60/60/60;
          }
          counter ++;
        };
      $("#fullcal").append(dialogHTML);
     
      // init event data for overview
      // TODO: auf die bevorstehenden Events umschreiben!!!!!!!
      var lastEvent = Object.keys(json).length;
      lastEvent = lastEvent - 1;
      var overviewHtml = "";
      var descTeaser = "";
      if(lastEvent < 10){
        for(var i = 0;i < lastEvent ; i++){
          var title = json[lastEvent]['title']; 
          var description = json[lastEvent]['description'];
          var start = json[lastEvent]['start'];
          var end = json[lastEvent]['end'];
          var dueTime = Math.round((new Date(start) - new Date()) / 1000 / 60 / 60);
          var sign = "";
          if(dueTime < 72){  
            if(((new Date(start) - new Date()) / 1000 / 60 / 60) < dueTime){
              sign = "<";
            }else{
              sign = ">";
            }
            if(description.toString().length > 100){
              descTeaser = description.toString().substring(0, 100);
              descTeaser += "...";
            }else{
              descTeaser = description;
            }  
            overviewHtml += "<tr><td></td><td>"+title+"</td><td>"+descTeaser+"</td><td>"+start+"</td><td>"+end+"</td></tr>";
          } 
          lastEvent--;
        };
      }else{
        for(var i = 0;i < 10 ; i++){
          var title = json[lastEvent]['title']; 
          var description = json[lastEvent]['description'];
          var start = json[lastEvent]['start'];
          var end = json[lastEvent]['end'];
          var dueTime = Math.round((new Date(start) - new Date()) / 1000 / 60 / 60);
          var sign = "";
          if(dueTime < 72){
            if(((new Date(start) - new Date()) / 1000 / 60 / 60) < dueTime){
              sign = "<";
            }else{
              sign = ">";
            }
            if(description.toString().length > 100){
              descTeaser = description.toString().substring(0, 100);
              descTeaser += "...";
            }else{
              descTeaser = description;
            }  
            overviewHtml += "<tr><td>"+sign+""+dueTime+"h</td><td>"+title+"</td><td>"+descTeaser+"</td><td>"+start+"</td><td>"+end+"</td></tr>";
          }
          lastEvent--;
        };
      }
      $("#ov_eventTable").append(overviewHtml);
  };       
});