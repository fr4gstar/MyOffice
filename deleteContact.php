<?php
  session_start();
  if(isset($_SESSION['login']) == false){
    die("Du bist nicht eingeloggt");
  }else{
      $cid = $_GET['cid'];
      $sql = "SELECT uid FROM rel_user_contact where cid = '".$cid."' ";
      $res = mysql_query($sql) or die("SQL STMT ".$sql." fehlerhaft");
      while ($row = mysql_fetch_assoc($res)) {
        $uid = $row['uid'];
      }
      if($uid == $_SESSION['uid']){
        $sql_delete = "DELETE FROM rel_user_contact WHERE uid = '".$uid."' AND cid = '".$cid."'";
        $res_delete = mysql_query($sql_delete) or die("SQL STMT ".$sql_delete." fehlerhaft");
        $sql_delete = "DELETE FROM contact WHERE cid = '".$cid."'";
        $res_delete = mysql_query($sql_delete) or die("SQL STMT ".$sql_delete." fehlerhaft");
        echo 1;
      }else{
        echo 0;
      }
      mysql_close($conn);
    }
?>