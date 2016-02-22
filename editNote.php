<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if((isset($_GET['nid']) AND isset($_GET['title']) AND isset($_GET['description'])) AND ((strlen($_GET['title']) > 0) OR (strlen($_GET['description']) > 0))) {
        $nid = mysql_real_escape_string($_GET['nid']);
        $title = mysql_real_escape_string($_GET['title']);
        $description = mysql_real_escape_string($_GET['description']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql = "SELECT uid FROM rel_user_note where nid = '".$nid."'";
          $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
          while ($row = mysql_fetch_assoc($res)) {
            $uid = $row['uid'];
          }
          if($uid == $_SESSION['uid']){
          $sql_insert_contact = "UPDATE note SET `title`='".$title."', `description`='".$description."' WHERE id='".$nid."'";
          $res_insert_contact = mysql_query($sql_insert_contact) or die("SQL STMT ".$sql_insert_contact." fehlerhaft");
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