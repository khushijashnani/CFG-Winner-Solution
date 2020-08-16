AOS.init();

var js2 = {
	"email":"jai@gmail.com",
	"username":"jai",
	"phone_no":"9876543210",
	"address":"address",
	"password":"12345678"
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
$( document ).ready(function() {
    var x = getCookie('auth');
    console.log(x);
    if(x=="''" || x==''){
        console.log('User is not logged in');
    }
    else{
        window.location.pathname = "home.html"
    }

  });

function login(){
  var regex = /^(?=.*\d)[\d]{10}$/;
  var regex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  var phone = document.getElementById('phone').value;
  var password = document.getElementById('password').value;
  if(phone.match(regex) ){//&& password.match(regex2)){
    var js = {
      "phone_no":phone,
      "password":password
  };
  console.log(js);
  document.getElementById('regex').innerHTML = "Checking!"
  $.post("https://project-umeed.herokuapp.com/app/om/login/", js ,   function(data, status) {
  console.log(data);
  document.cookie = "auth="+ data.User.token;
  window.location.pathname = "home.html"
}).fail(
  function(data){
      console.log(data);
      document.getElementById('regex').innerHTML = data.responseText
  }
);
  }
  else{
       document.getElementById('regex').innerHTML = "Incorrect Format!";
  }
   
};
document.getElementById("button1").addEventListener("click", function(event){
    event.preventDefault()
    login();
  });
// $.post("https://crack-corona-hack-backend.herokuapp.com/app/user/signup/", js2 ,   function(data, status) {
//     console.log(data,status);
// }).fail(
//     function(data){
//         console.log(data.responseJSON.message);
//     }
// );