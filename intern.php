<?php
session_start();
if(isset($_SESSION['login']) == false){
  die("Du bist nicht eingeloggt");
}else{
?>

<!Doctype html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="//cdn.datatables.net/1.10.10/js/jquery.dataTables.min.js" type="text/javascript"></script>
    
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <script src="js\contacts.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <meta http-equiv=”expires” content=”0”>
    <meta name=“robots“ content=“noindex“ />
    <meta name=“description“ content=“Office Web-Application with Contacts, Calendar, Task-Manager and Notes“ />
    <meta charset=”utf-8” />
    <script>
      $(function() {
        $( "#tabs" ).tabs();
      });
    </script>
  </head>
  
  <header>
    <div id="header"> 
    Login: <?php echo $_SESSION['email'];?> // User-ID: <?php echo $_SESSION['uid'];?> // Name: <?php echo $_SESSION['firstname'];?> <?php echo $_SESSION['lastname'];?> // Login Counter: <?php echo $_SESSION['login_counter'];?> // Session ID: <?php echo $_SESSION['sid'];?>
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
        <li><a href="#taskmanager">Aufgaben-Manager</a></li>
        <li><a href="#calendar">Kalender</a></li>
      </ul>
      <div id="overview"></div>
      <div id="contacts"></div>
      <div id="notes"></div>
      <div id="taskmanager"></div>
      <div id="calendar"></div>
    </div>                                                
  </article>
  
  <footer>
    <script type="text/javascript">
      jQuery(document).ready(function(){
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