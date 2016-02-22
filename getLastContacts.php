<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{ 
      $conn = mysql_connect("localhost", "root", "");
      if(!$conn)
          die("Verbindung zur DB kann nicht hergestellt werden!");
      mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
      
      $sql1 = "Select cid from rel_user_contact where uid=(SELECT id from USER where email ='".$_SESSION['email']."');";
      $res1 = mysql_query($sql1) or die("SQL STMT ".$sql1." fehlerhaft");
      $contacts = [];
      $counter = 1;
      while ($row = mysql_fetch_array($res1, MYSQL_NUM)) {
        $sql2 = "SELECT * FROM contact WHERE id=".$row[0].";";
        $res2 = mysql_query($sql2) or die("SQL STMT ".$sql2." fehlerhaft");
        
        while ($row2 = mysql_fetch_array($res2, MYSQL_NUM)) {
          $contacts [$counter] = [$counter => $row2];
          $counter ++;
        }
      }
      /*
      // if needed - SQL QUERY: last 5 entries 
      SELECT * FROM (
        SELECT * FROM Customers ORDER BY CustomerID DESC LIMIT 5
      ) sub
      ORDER BY CustomerID ASC
      */
      
      echo json_encode($contacts);
      mysql_close($conn);
    }
?>
