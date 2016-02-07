<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['firstname']) AND isset($_GET['lastname']) AND isset($_GET['firm']) AND isset($_GET['email']) AND isset($_GET['tel']) AND isset($_GET['note']) OR (strlen($_GET['firstname']) > 0) OR (strlen($_GET['lastname']) > 0) OR (strlen($_GET['firm']) > 0) OR (strlen($_GET['email']) > 0) OR (strlen($_GET['tel']) > 0)) {
        $firstname = mysql_real_escape_string($_GET['firstname']);
        $lastname = mysql_real_escape_string($_GET['lastname']);
        $firm = mysql_real_escape_string($_GET['firm']);
        $email = mysql_real_escape_string($_GET['email']);
        $tel = mysql_real_escape_string($_GET['tel']);
        $note = mysql_real_escape_string($_GET['note']);
        $conn = mysql_connect("localhost", "root", "");
          if(!$conn)
            die("Verbindung zur DB kann nicht hergestellt werden!");
          mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
          $sql_getLastID = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'myoffice' AND TABLE_NAME = 'contact'";
          $res_getLastID = mysql_query($sql_getLastID) or die("SQL STMT ".$sql_getLastID." fehlerhaft");
          while ($row = mysql_fetch_assoc($res_getLastID)) {
            $id = $row['AUTO_INCREMENT'];
          }
          $sql_insert_contact = "Insert into contact (`firstname`, `lastname`, `company`,`email`, `phonenumber` ,`note`) VALUES ('".$firstname."','".$lastname."','".$firm."','".$email."','".$tel."','".$note."')";
          $res_insert_contact = mysql_query($sql_insert_contact) or die("SQL STMT ".$sql_insert_contact." fehlerhaft");
          $sql_insert_rel_contact = "Insert into rel_user_contact (`uid`,`cid`) VALUES ('".$_SESSION['uid']."','".$id."')";
          $res_insert_rel_contact = mysql_query($sql_insert_rel_contact) or die("SQL STMT ".$sql_insert_rel_contact." fehlerhaft");
          echo 1;
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>