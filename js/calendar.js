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
            right:  'today prev,next'
  }); 
        
  jQuery.get("calendar.php",{},function(data){        
        //init events
        var json = $.parseJSON(data);
        var counter = 1;
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
        $("#fullcal").load (function(){
          $("#fullcal").fullCalendar( 'addEventSource', event);
          console.log("added Eventsource");
        });     
    });
    
          
});