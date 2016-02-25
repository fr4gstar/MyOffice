<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{ 
      $conn = mysql_connect("localhost", "root", "");
      if(!$conn)
          die("Verbindung zur DB kann nicht hergestellt werden!");
      mysql_select_db("myOffice") or die("Datenbank existiert nicht!");

      $sql1 = "Select eid from rel_user_event where uid=(SELECT id from USER where email ='".$_SESSION['email']."');";
      $res1 = mysql_query($sql1) or die("SQL STMT ".$sql1." fehlerhaft");
      $events = [];
      while ($row = mysql_fetch_array($res1, MYSQL_NUM)) {
        $sql2 = "SELECT * FROM event WHERE id=".$row[0].";";
        $res2 = mysql_query($sql2) or die("SQL STMT ".$sql2." fehlerhaft");
        while ($row2 = mysql_fetch_array($res2, MYSQL_NUM)) {
          $event ['id'] = $row2[0];
          $event ['title'] = $row2[1];
          $event ['description'] = $row2[2];
          $event ['start'] = $row2[3];
          $event ['end'] = $row2[4];
          array_push($events, $event);
        }
      }
      echo json_encode($events);
      mysql_close($conn);
    }
?>