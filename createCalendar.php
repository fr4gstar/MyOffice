<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['title']) AND isset($_GET['description']) AND isset($_GET['start']) AND isset($_GET['end'])) {
        $title = mysql_real_escape_string($_GET['title']);
        $description = mysql_real_escape_string($_GET['description']);
        $start = mysql_real_escape_string($_GET['start']);
        $end = mysql_real_escape_string($_GET['end']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql_getLastID = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'myoffice' AND TABLE_NAME = 'event'";
          $res_getLastID = mysql_query($sql_getLastID) or die("SQL STMT ".$sql_getLastID." fehlerhaft");
          while ($row = mysql_fetch_assoc($res_getLastID)) {
            $id = $row['AUTO_INCREMENT'];
          }
          $sql_insert_event = "Insert into event (`title`, `description`, `startDate`,`endDate`) VALUES ('".$title."','".$description."','".$start."','".$end."')";
          $res_insert_event = mysql_query($sql_insert_event) or die("SQL STMT ".$sql_insert_event." fehlerhaft");
          $sql_insert_rel_event = "Insert into rel_user_event (`uid`,`eid`) VALUES ('".$_SESSION['uid']."','".$id."')";
          $res_insert_rel_event = mysql_query($sql_insert_rel_event) or die("SQL STMT ".$sql_insert_rel_event." fehlerhaft");
          echo 1;
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>