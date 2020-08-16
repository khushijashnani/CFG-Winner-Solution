AOS.init();
var user;
var field = document.getElementById('name');
var list = document.getElementById('listmob');
var j = document.getElementById('stats');
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
function generateGraph(div){
  var x = document.createElement("CANVAS");
  var f;
  var sratio;
  var lratio;
  $.get("https://project-umeed.herokuapp.com/app/om/data/3",function(data){
    console.log(data.data);
    sratio = data.data.converted_leeds/data.data.total_students;
    lratio = data.data.events_done/data.data.total_event;
  }).fail(function(data){
      console.log(data);
  });
  console.log(sratio,lratio);
  var ctx = x.getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Leed/Students','Sucess/Total Events'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
  div.append(x);
}
$( document ).ready(function() {
    var x = getCookie('auth');
    console.log(x);
    if(x=="''" || x==''){
        window.location.pathname = "index.html"
    }
    else{
        console.log('Welcome');
        $.ajaxSetup({
            headers: { 'Authorization': "Token "+getCookie('auth') }
        });
        $.get("https://project-umeed.herokuapp.com/app/om/detials/",function(data, status){
          field.innerHTML ="Hi,"+data.User.username;
        }).fail(function(data){
            console.log('Detail Fetch Failed!');
            console.log(data)
        });
    }

  });
 
function logout(event){
    console.log(getCookie('auth'));
    console.log(document.cookie);
    document.cookie = "auth=''";
    window.location.pathname = "index.html";
    // $.get("https://project-umeed.herokuapp.com/app/om/logout",function(data, status){
    //     console.log(data);
    //     ;
    //     window.location.pathname = "index.html"
    //   }).fail(function(data){
    //     console.log(data);
    //       console.log('Logout Failed!');
    //   });
    
};
var ctr =0;
function showvalue(x){
 console.log(x);
 j.innerHTML = '<h1> Stats for Mob-id:'+x[0].mobiliser_id+"</h1>";
 var k = document.createElement('div');
 generateGraph(k);
 var m = document.createElement('div');
 x.forEach(element=>{
  var u = document.createElement('div');
  var p = document.createElement('p');
  var p1 = document.createElement('p');
  var p2 = document.createElement('p');
  var img = document.createElement('img');
  img.src = element.filename;
  p.innerHTML = "Name : "+ element.name;
  p1.innerHTML = "Area : " + element.area;
  p2.innerHTML = "Participants : "+element.participants;
  u.append(p,p1,p2,img);
  m.append(u);
 });
 j.append(m,k);
}
$(document).ready(function(){
  $.get("https://project-umeed.herokuapp.com/app/om/getMob/",function(data,sts){
    console.log(data);
    var ct =1;
     data.Mobilizers.forEach(element => {
        var div = document.createElement('div');
        var p = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');
        div.id = element.id;
        p.innerHTML = "Name : "+element.username;
        p2.innerHTML = "Phone : "+element.phone_no;
        p3.innerHTML = "Id : "+element.id;
        div.append(p,p2,p3);
        console.log(element.id);
        div.classList.add('mobile');
        list.append(div);
        div.addEventListener('click',function(event){
          console.log(event.target.id);
          $.get("https://project-umeed.herokuapp.com/app/mob/event/"+event.target.id,function(data,status){
            console.log(data.Events);
             showvalue(data.Events);
          }).fail(function(err){
            console.log(err);
            console.log('Error');
          });
        });

     });
  });
})

// $.get("https://crack-corona-hack-backend.herokuapp.com/app/user/login/",function(data, status) {
//   console.log(data);
//   array.forEach(element => {
    
//   });
// }).fail(
//   function(data){
//       document.getElementById('regex').innerHTML = "Incorrect Email Password Combination!"
//   }
// );