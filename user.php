<?php
  //Datenbankverbindung aufbauen
    $conn = mysql_connect("localhost", "root", "");
  if(!$conn)
        die("Verbindung zur DB kann nicht hergestellt werden!");
  mysql_select_db("project") or die("Datenbank existiert nicht!");
    
    $sql = "SELECT name FROM user";
    $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
    
    $func = $_GET['func'];
    
  while ($row = mysql_fetch_assoc($res)) {
    echo $row["name"];
    echo ";";
  } 
?>