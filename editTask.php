<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['tid']) AND isset($_GET['title']) AND isset($_GET['description']) AND isset($_GET['note']) AND isset($_GET['elapsedTime']) AND (strlen($_GET['title']) > 0)) {
        $tid = mysql_real_escape_string($_GET['tid']);
        $title = mysql_real_escape_string($_GET['title']);
        $description = mysql_real_escape_string($_GET['description']);
        $note = mysql_real_escape_string($_GET['note']);
        $elapsedTime = mysql_real_escape_string($_GET['elapsedTime']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql = "SELECT uid FROM rel_user_task where tid = '".$tid."'";
          $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
          while ($row = mysql_fetch_assoc($res)) {
            $uid = $row['uid'];
          }
          if($uid == $_SESSION['uid']){
            $sql_insert_task = "UPDATE task SET `title`='".$title."', `description`='".$description."', `note`='".$note."', `elapsedTime`='".$elapsedTime."' WHERE id='".$tid."'";
            $res_insert_task = mysql_query($sql_insert_task) or die("SQL STMT ".$sql_insert_task." fehlerhaft");
          echo 1;
          } else {
            echo 0;
          }  
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>