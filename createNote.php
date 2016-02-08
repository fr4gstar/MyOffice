<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['title']) AND isset($_GET['description']) AND (strlen($_GET['title']) > 0)) {
        $title = mysql_real_escape_string($_GET['title']);
        $description = mysql_real_escape_string($_GET['description']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql_getLastID = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'myoffice' AND TABLE_NAME = 'note'";
          $res_getLastID = mysql_query($sql_getLastID) or die("SQL STMT ".$sql_getLastID." fehlerhaft");
          while ($row = mysql_fetch_assoc($res_getLastID)) {
            $id = $row['AUTO_INCREMENT'];
          }
          $sql_insert_note = "Insert into note (`title`, `description`) VALUES ('".$title."','".$description."')";
          $res_insert_note = mysql_query($sql_insert_note) or die("SQL STMT ".$sql_insert_note." fehlerhaft");
          $sql_insert_rel_note = "Insert into rel_user_note (`uid`,`nid`) VALUES ('".$_SESSION['uid']."','".$id."')";
          $res_insert_rel_note = mysql_query($sql_insert_rel_note) or die("SQL STMT ".$sql_insert_rel_note." fehlerhaft");
          echo 1;
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>