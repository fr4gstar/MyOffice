<!Doctype html>
<html>
  <head>
    <script src="http://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
    <script src="js/login.js" type="text/javascript"></script>
    <script src="js/register.js" type="text/javascript"></script>
    <script src="js/jquery.cookie.js" type="text/javascript"></script>
    <link rel="stylesheet" href="css/style.css">
    <meta http-equiv=”expires” content=”0”>
    <meta name=“robots“ content=“noindex“ />
    <meta name=“description“ content=“Office Web-Application with Contacts, Calendar, Task-Manager and Notes“ />
    <meta charset=”utf-8” />
  </head>
  
  <header></header>
  
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
      Geschlecht:<br>
      <input type="radio" name="gender" value ="f">weiblich</input>
      <input type="radio" name="gender" value ="m">männlich</input>
      Password#1:
      <input id="password" type="password"></input>
      Password#2:
      <input id="password2" type="password"></input>
      eMail:
      <input id="email" type="text"></input>
      <select id="country" name="country">
        <option value="none" selected>Land auswählen</option>
        <option value="Österreich">Österreich</option>
        <option value="Schweiz">Schweiz</option>
        <option value="Deutschland">Deutschland</option>
        <option value="Niederlande">Niederlande</option>
        <option value="Frankreich">Frankreich</option>
      </select>
      <br>
      <button id="reg_submit" type="button">Anmelden</button>
    </div>
  </article>
  <footer></footer>
</html>