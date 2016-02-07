<?php
  session_start();
  if (isset($_SESSION['sid']) == false){
    $_SESSION['sid'] = uniqid();
    $_SESSION['login_counter'] = 1; 
  }else{
    $_SESSION['login_counter'] = $_SESSION['login_counter'] + 1; 
  };
  
  if(isset($_GET['firstname']) AND isset($_GET['lastname']) AND isset($_GET['password']) AND isset($_GET['gender']) AND isset($_GET['email']) AND isset($_GET['country']) AND (strlen($_GET['firstname']) > 0) AND (strlen($_GET['lastname']) > 0) AND (strlen($_GET['password']) > 0) AND (strlen($_GET['email']) > 0)) {
    $firstname = mysql_real_escape_string($_GET['firstname']);
    $lastname = mysql_real_escape_string($_GET['lastname']);
    $password = mysql_real_escape_string($_GET['password']);
    $password = md5($password);
    $email = mysql_real_escape_string($_GET['email']);
    $gender = mysql_real_escape_string($_GET['gender']);
    $country = mysql_real_escape_string($_GET['country']);

       //Datenbankverbindung aufbauen
    $conn = mysql_connect("localhost", "root", "");
    if(!$conn) die("Verbindung zur DB kann nicht hergestellt werden!");
    mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
      
    $sql = "SELECT id  FROM user WHERE email = '".$email."'";
    $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
      
    if(mysql_num_rows($res) >= 1){
         echo "PHP: Email-Adresse ist bereits registriert!";
    }else{
          $row = mysql_fetch_assoc($res);
          // Es existiert ein User
          $_SESSION['login'] = true;
          $_SESSION['email']  = $email;
          $_SESSION['password']  = $password;
          $_SESSION['uid']   = $row['id'];
          $_SESSION['first']   = $row['first'];
          $_SESSION['lastname']   = $row['lastname'];
          $_SESSION['gender']   = $row['gender'];
          $_SESSION['country']   = $row['country'];

          $sql_insert_user = "Insert into user (`firstname`, `lastname`, `gender`,`password`, `email`, `country` ,`sid`) VALUES ('".$firstname."','".$lastname."','".$gender."','".$password."','".$email."','".$country."','".$_SESSION['sid']."')";
      
          mysql_query($sql_insert_user) or die("PHP: SQL Query Error!");
          // wir speicher die SESSION ID in der Datenbank
          // $sql = "UPDATE user set sid = '".$_SESSION['sid']."' WHERE id = ".$row['id']."";
          // mysql_query($sql) or die("SID konnte nicht gespeichert werden");
          echo "1";
      }
  }else{
    echo "PHP: Angaben sind nicht Vollständig!";
  }
?>