jQuery(document).ready(function(){
  jQuery("#reg_submit").click(function(){    
    if(jQuery("#firstname").val().length != 0 && jQuery("#lastname").val().length != 0 && jQuery("#email").val().length != 0 && jQuery("input:radio[name='gender']:checked").val().length != 0 && jQuery("#password").val().length != 0 && jQuery("#password2").val().length != 0){
      // check password equal to password 2
      if(jQuery("#password").val() !== jQuery("#password2").val()){
        alert("Die Passwörter stimmen nicht überein!");
      }else if(jQuery("#password").val().length < 8){
        alert("Das Passwort muss min. 8 Zeichen enthalten!");
      }else if(jQuery("#country").val() == "none"){
        alert("Bitte das Land angeben!");
      }else{
        jQuery.get("register.php",{
          firstname: jQuery("#firstname").val(),
          lastname: jQuery("#lastname").val(),
          gender: jQuery("input:radio[name='gender']:checked").val(),
          email: jQuery("#email").val(),
          password: jQuery("#password").val(),
          country: jQuery("#country").val()
          },function(data){
              if(data == 1){
                window.location.href = "intern.php";
              }
              else{
                alert(data);
              }
          });
        }
    }else{
      alert("Alle Felder müssen ausgefüllt werden!");  
    }
  });
});