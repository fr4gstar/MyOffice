<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['eid']) AND isset($_GET['title']) AND isset($_GET['description']) AND isset($_GET['start']) AND isset($_GET['end'])) {
        //  OR (strlen($_GET['title']) > 0) OR (strlen($_GET['description']) > 0) OR (strlen($_GET['start']) > 0) OR (strlen($_GET['end']) > 0)
        $eid = mysql_real_escape_string($_GET['eid']);
        $title = mysql_real_escape_string($_GET['title']);
        $description = mysql_real_escape_string($_GET['description']);
        $start = mysql_real_escape_string($_GET['start']);
        $end = mysql_real_escape_string($_GET['end']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql = "SELECT uid FROM rel_user_event where eid = '".$eid."'";
          $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
          while ($row = mysql_fetch_assoc($res)) {
            $uid = $row['uid'];
          }
          if($uid == $_SESSION['uid']){
          $sql_insert_event = "UPDATE event SET `title`='".$title."', `description`='".$description."', `startDate`='".$start."',`endDate`='".$end."' WHERE id='".$eid."'";
          $res_insert_event = mysql_query($sql_insert_event) or die("SQL STMT ".$sql_insert_event." fehlerhaft");
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