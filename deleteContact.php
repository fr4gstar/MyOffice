<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      $conn = mysql_connect("localhost", "root", "");
        if(!$conn)
          die("Verbindung zur DB kann nicht hergestellt werden!");
      mysql_select_db("myOffice") or die("Datenbank existiert nicht!");
      $cid = mysql_real_escape_string($_GET['cid']);
      $sql = "SELECT uid FROM rel_user_contact where cid = '".$cid."'";
      $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
      while ($row = mysql_fetch_assoc($res)) {
        $uid = $row['uid'];
      }
      if($uid == $_SESSION['uid']){
        $sql_delete1 = "DELETE FROM rel_user_contact WHERE uid = '".$uid."' AND cid = '".$cid."'";
        $res_delete1 = mysql_query($sql_delete1) or die("SQL STMT ".$sql_delete1." fehlerhaft");
        $sql_delete2 = "DELETE FROM contact WHERE id = '".$cid."'";
        $res_delete2 = mysql_query($sql_delete2) or die("SQL STMT ".$sql_delete2." fehlerhaft");
        echo 1;
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>