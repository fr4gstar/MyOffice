<?php
  session_start();
  if (isset($_SESSION['sid']) == false){
    $_SESSION['sid'] = uniqid();
    $_SESSION['login_counter'] = 1; 
  } else{
    $_SESSION['login_counter'] = $_SESSION['login_counter'] + 1; 
  };
  
  if($_SESSION['login_counter'] < 10 AND isset($_GET['email']) AND isset($_GET['password']) AND (strlen($_GET['email']) > 0) AND (strlen($_GET['password']) > 0)) {
    $email = mysql_real_escape_string($_GET['email']);
    $password = mysql_real_escape_string($_GET['password']);
    $password = md5($password);
    $conn = mysql_connect("localhost", "root", "");
  if(!$conn)
        die("Verbindung zur DB kann nicht hergestellt werden!");
    mysql_select_db("myoffice") or die("Datenbank existiert nicht!");
    
    $sql = "SELECT id, firstname, lastname FROM user WHERE email = '".$email."' AND password = '".$password."'";
    $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");

    if(mysql_num_rows($res) == 1){
        $row = mysql_fetch_assoc($res);
        // Es existiert ein User
        $_SESSION['login'] = true;
        $_SESSION['email']  = $email;
        $_SESSION['password']  = $password;
        $_SESSION['uid']   = $row['id'];
        $_SESSION['firstname']  = $row['firstname'];
        $_SESSION['lastname']  = $row['lastname'];
        // wir speicher die SESSION ID in der Datenbank
        $sql = "UPDATE user set sid = '".$_SESSION['sid']."' WHERE id = ".$row['id']."";
        mysql_query($sql) or die("PHP: SID konnte nicht gespeichert werden");
        echo "1";
    }else{
      echo "PHP: Email und Passwort stimmen nicht überein!" .$_SESSION['login_counter']. " Login Versuch";      
    }
  }else{
    if($_SESSION['login_counter'] == 5){
      echo "PHP: 5 Fehlerhafte Logins - Session ".$_SESSION['sid']." ist gesperrt";
    }else{
      echo "PHP: Unbekannter Fehler ".$_SESSION['sid']." - ".$_GET['email']." - ".$_GET['password']." - ".$_SESSION['login_counter']." Versuch";
    }
  }
?>