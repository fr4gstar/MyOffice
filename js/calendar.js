jQuery(document).ready(function(){
  var event = [];
  jQuery("#calendar").append("<div id='fullcal'><div>");
  $("#fullcal").fullCalendar({
            dayClick: function(date, jsEvent, view) {
              alert('Clicked on: ' + date.format());
              alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
              alert('Current view: ' + view.name);
              // change the day's background color just for fun
              $(this).css('background-color', 'red');
            },
            weekends: true,
            aspectRatio: 2,
            editable: true,
            defaultDate: new Date(),
            left:   '',
            center: '',
            right:  'today prev,next',
            events: event
  });
  
  function createEvents(data){
      var json = $.parseJSON(data);
      var counter = 1;
      //init events
        while(json[counter]){
          event = [{
            id : json[counter][counter][0],
            title : json[counter][counter][1],
            description : json[counter][counter][2],
            start : json[counter][counter][3],
            end : json[counter][counter][4]
          }]; 
          counter ++;
        };
      //var dialogHTML = "<div id='dialog-form'><form></form></div>";
      //jQuery("#showevents").append(dialogHTML);
      var dialogHTML = "";
      var tableContentHTML = "";
      
      /*
      //create/parse HTML  dialog and tableContent 
      while(json[counter]){
        var eventID = json[counter][counter][0];
        var title = json[counter][counter][1];
        var description = json[counter][counter][2];
        var start = json[counter][counter][3];
        var end = json[counter][counter][4];
        //dialogHTML += "<div id='dialog"+eventID+"' class='dialog'><form><fieldset><label for='f_firstname'>Vorname</label><input type='text' name='firstname' id='f_firstname"+eventID+"' value='"+firstname+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_lastname'>Nachname</label><input type='text' name='lastname' id='f_lastname"+eventID+"' value='"+lastname+"' class='text ui-widget-content ui-corner-all'><br /><label for='company'>Firma</label><input type='text' name='company' id='f_company"+eventID+"' value='"+company+"' class='text ui-widget-content ui-corner-all'><br /><label for='f_email'>Email</label><input type='text' name='email' id='f_email"+eventID+"' value='"+email+"' class='text ui-widget-content ui-corner-all'><br /><label for='tel'>Telefonnummer</label><input type='text' name='f_tel' id='f_tel"+eventID+"' value='"+tel+"' class='text ui-widget-content ui-corner-all'><br /><label for='note'>Notiz</label><br /><textarea name='note' id='f_note"+eventID+"' type='text' cols='40' rows='7' class='text ui-widget-content ui-corner-all'>"+note+"</textarea><input type='submit' tabindex='-1' style='position:absolute; top:-1000px'></fieldset></form></div>";
        //tableContentHTML += "<tr><td></td><td>"+title+"</td><td>"+description+"</td><td>"+start+"</td><td>"+end+"</td></tr>";
        counter++;
      };
      jQuery("#eventTable").append(tableContentHTML);
      //jQuery("#showEvents").append(dialogHTML);
      */
      // init event data for overview
      // TODO: auf die bevorstehenden Events umschreiben!!!!!!!
      var lastEvent = Object.keys(json).length;
      var overviewHtml = "";
      var descTeaser = "";
      if(lastEvent < 5){
        for(var i = 0;i < lastEvent ; i++){
          if(json[lastEvent][lastEvent][2].toString().length > 100){
            descTeaser = json[lastEvent][lastEvent][2].toString().substring(0, 100);
            descTeaser += "...";
          }else{
            descTeaser = json[lastEvent][lastEvent][2];
          }  
          overviewHtml += "<tr><td>"+json[lastEvent][lastEvent][1]+"</td><td>"+descTeaser+"</td><td>"+json[lastEvent][lastEvent][3]+"</td><td>"+json[lastEvent][lastEvent][4]+"</td></tr>";
          lastEvent--;
        };
      }else{
        for(var i = 0;i < 5 ; i++){
          if(json[lastEvent][lastEvent][2].toString().length > 100){
            descTeaser = json[lastEvent][lastEvent][2].toString().substring(0, 100);
            descTeaser += "...";
          }else{
            descTeaser = json[lastEvent][lastEvent][2];
          }  
          overviewHtml += "<tr><td>"+json[lastEvent][lastEvent][1]+"</td><td>"+descTeaser+"</td><td>"+json[lastEvent][lastEvent][3]+"</td><td>"+json[lastEvent][lastEvent][4]+"</td></tr>";
          lastEvent--;
        };
      }
      jQuery("#ov_eventTable").append(overviewHtml);
  };
      
  jQuery.get("calendar.php",{},function(data){        
        createEvents(data);
        $("#fullcal").load (function(){
          $("#fullcal").fullCalendar( 'addEventSource', event);
          console.log("added Eventsource");
        });     
    });       
});