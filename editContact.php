<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      if(isset($_GET['cid']) AND isset($_GET['firstname']) AND isset($_GET['lastname']) AND isset($_GET['firm']) AND isset($_GET['email']) AND isset($_GET['tel']) AND isset($_GET['note'])) {
        
        //  OR (strlen($_GET['firstname']) > 0) OR (strlen($_GET['lastname']) > 0) OR (strlen($_GET['firm']) > 0) OR (strlen($_GET['email']) > 0) OR (strlen($_GET['tel']) > 0)
        $cid = mysql_real_escape_string($_GET['cid']);
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
          $sql = "SELECT uid FROM rel_user_contact where cid = '".$cid."'";
          $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
          while ($row = mysql_fetch_assoc($res)) {
            $uid = $row['uid'];
          }
          if($uid == $_SESSION['uid']){
          $sql_insert_contact = "UPDATE contact SET `firstname`='".$firstname."', `lastname`='".$lastname."', `company`='".$firm."',`email`='".$email."', `phonenumber`='".$tel."',`note`='".$note."' WHERE id='".$cid."'";
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