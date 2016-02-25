<?php
session_start();
if(isset($_SESSION['login']) == true){
  header('Location: intern.php');
}else{
?>

<!Doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="expires" content="0">
    <meta name="robots" content="index" />
    <meta name="title" content="MyOffice">
    <meta name="description" content="Office Web-Application with Contacts, Calendar, Task-Manager and Notes" />
    <link rel="canonical" href="http://localhost/myoffice" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js" type="text/javascript"></script>
    <script src="js/login.min.js" type="text/javascript"></script>
    <script src="js/register.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/styles.min.css">
    <title>MyOffice</title>
  </head>
  
  <header>My Office - Web Anwendung</header>
  
  <article>
    <div id="login_mask">
      <h1>Login</h1>
      eMail:
      <input id="login_email" type="text"></input>
      Password:
      <input id="login_password" type="password"></input>
      
      <button id="login_submit" type="button">Einloggen</button>
    </div>
    
    <div id="reg_mask">
      <h1>Anmelden</h1>
      Vorname:
      <input id="firstname" type="text"></input>
      Nachname:
      <input id="lastname" type="text"></input>
      <input type="radio" name="gender" value ="f">Weiblich</input>
      <input type="radio" name="gender" value ="m">M&auml;nnlich</input><br />
      Password#1:
      <input id="password" type="password"></input>
      Password#2:
      <input id="password2" type="password"></input>
      eMail:
      <input id="email" type="text"></input>
      <select id="country" name="country">
        <option value="none" selected>Land ausw&auml;hlen</option>
        <option value="Oesterreich">&Ouml;sterreich</option>
        <option value="Schweiz">Schweiz</option>
        <option value="Deutschland">Deutschland</option>
        <option value="Niederlande">Niederlande</option>
        <option value="Frankreich">Frankreich</option>
      </select>
      <br>
      <button id="reg_submit" type="button">Anmelden</button>
    </div>
  </article>
  <footer>
    &copy; 2016 Hochschule M&uuml;nchen - Web-Techniken - Sergej Bardin
  </footer>
</html>
<?php
}
?>