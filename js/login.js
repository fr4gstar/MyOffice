jQuery(document).ready(function(){
  jQuery("#login_submit").click(function(){
    jQuery.get("login.php",{
      email : jQuery("#login_email").val(),
      password :  jQuery("#login_password").val()
      },function(data){
        if(jQuery("#login_email").val().length != 0 && jQuery("#login_password").val().length != 0){
          if(data == 1){
            setCookieLastLogin();
            if($.cookie('loginCounter')){
              destroyCookieLoginCounter();
            }
            window.location.href = "intern.php";
          }else{
            setCookieLoginCounter(data[39]);
            jQuery("#lastCounter").empty();
            jQuery("#lastCounter").append($.cookie('loginCounter'));
            alert(data);
          }
        }else{
            setCookieLoginCounter(data[39]);
            jQuery("#lastCounter").empty();
            jQuery("#lastCounter").append($.cookie('loginCounter'));
            alert("Benutzername/Kennwort ist nicht angegeben!");
          }     
      });
  });
  
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  function setCookieLastLogin(){
    var date = new Date();  
    var monthNames = ["Januar", "Februar", "März","April", "Mai", "Juni", "Juli","August", "September", "Oktober","November", "Dezember"];
    $.cookie('lastLogin', 'Letzter Login: '+ date +'');
  };
  
  function setCookieLoginCounter(counter){
    console.log(counter);
    if(isNumeric(counter)){
      $.cookie('loginCounter', 'Logincounter: '+ counter +'');
    }
  };
  
  function destroyCookieLoginCounter(){
    $.removeCookie('loginCounter');    
  }; 
  
  if($.cookie('lastLogin')){
    jQuery("#login_mask").append("<div id='lastLogin' href='#'>"+$.cookie('lastLogin')+"</div>");
  };
  if($.cookie('loginCounter')){
    jQuery("#login_mask").append("<div id='lastCounter' href='#'>"+$.cookie('loginCounter')+"</div>");
  };
});