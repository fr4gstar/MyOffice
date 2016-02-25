<?php
session_start();
if(isset($_SESSION['login']) == false){
  die("Du bist nicht eingeloggt");
}else{
?>

<!Doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="expires" content="0">
    <meta name="robots" content="noindex" />
    <meta name="title" content="MyOffice - Intern">
    <meta name="description" content="Office Web-Application with Contacts, Calendar, Task-Manager and Notes" >
    <link rel="canonical" href="http://localhost/myoffice/intern.php" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.print.css" media="print" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.4.9/jquery.datetimepicker.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/fullcalendar.min.js"></script> 
    <script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.6.1/lang/de.js'></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.4.9/jquery.datetimepicker.min.js"></script>
    <script src="js/datetimepicker-master/build/jquery.datetimepicker.full.min.js"></script>
    <script src="js/contacts.js"></script>
    <script src="js/notes.js"></script>
    <script src="js/tasks.js"></script>
    <script src="js/calendar.js"></script>
  </head>
  <header>
    <div id="header"> 
    Login: <?php echo $_SESSION['email'];?> // User-ID: <?php echo $_SESSION['uid'];?> // Name: <?php echo $_SESSION['firstname'];?> <?php echo $_SESSION['lastname'];?> // Session ID: <?php echo $_SESSION['sid'];?>
    <button id="logout" type="button">Logout</button>
    </div>
  </header>
  <nav></nav>
  <article>
    <div id="tabs">
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#contacts">Kontakte</a></li>
        <li><a href="#notes">Notizen</a></li>
        <li><a href="#tasks">Aufgaben-Manager</a></li>
        <li><a href="#calendar">Kalender</a></li>
      </ul>
      <div id="overview">
        <div class='ov_header'>Zuletzt hinzugef&uuml;gt ...</div>
          <div id="ov_contacts" class="overview_line"></div>
          <div id="ov_notes" class="overview_line"></div>
          <div id="ov_tasks" class="overview_line"></div>
        <div id='ov_lastAdded'></div>
      </div>
      <div id="contacts"></div>
      <div id="notes"></div>
      <div id="tasks"></div>
      <div id="calendar"></div>
    </div>                                                
  </article>
  
  <footer>
    &copy; 2016 Hochschule M&uuml;nchen - Web-Techniken - Sergej Bardin
    <script type="text/javascript">
    jQuery(document).ready(function(){
       $('#tabs').tabs({
          activate: function (event, ui) {
            $('#fullcal').fullCalendar('render');
            $('#fullcal').fullCalendar('rerenderEvents');
        }
      });
        //Logout button init
        jQuery("#logout").click(function(){
          jQuery.get("logout.php",function(data){
             window.location.href = "index.php";
             console.log("Erfolgreich ausgeloggt!");
           });
        });                                
      });
    </script>
  </footer>
</html>

<?php
}
?>
