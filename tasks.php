<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{ 
      $conn = mysql_connect("localhost", "root", "");
      if(!$conn)
          die("Verbindung zur DB kann nicht hergestellt werden!");
      mysql_select_db("myOffice") or die("Datenbank existiert nicht!");

      $sql1 = "Select tid from rel_user_task where uid=(SELECT id from USER where email ='".$_SESSION['email']."');";
      $res1 = mysql_query($sql1) or die("SQL STMT ".$sql1." fehlerhaft");
      $tasks = [];
      $counter = 1;
      while ($row = mysql_fetch_array($res1, MYSQL_NUM)) {
        $sql2 = "SELECT * FROM task WHERE id=".$row[0].";";
        $res2 = mysql_query($sql2) or die("SQL STMT ".$sql2." fehlerhaft");
        
        while ($row2 = mysql_fetch_array($res2, MYSQL_NUM)) {
          $tasks [$counter] = [$counter => $row2];
          $counter ++;
        }
      }
      echo json_encode($tasks);
      mysql_close($conn);
    }
?>