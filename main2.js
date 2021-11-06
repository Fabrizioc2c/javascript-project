const iconElement = document.querySelector(".weather-icon");  
const tempElement = document.querySelector(".temperature-value p");  
const descElement = document.querySelector(".temperature-description p");  
const locationElement = document.querySelector(".location p");  
const notificationElement = document.querySelector(".notification");  
const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit); 
  
const weather = {};  
  
weather.temperature = {  
    unit : "celsius"  
}  
  const KELVIN = 273;  
  
const key = "5592128f62ae0bf71e7b939a95d8465c";  

if('geolocation' in navigator){  
   
 function setPosition(position){  
     let latitude = position.coords.latitude;  
     let longitude = position.coords.longitude;  
       
     getWeather(latitude, longitude);  
 }  
   
 function showError(error){  
     notificationElement.style.display = "block";  
     notificationElement.innerHTML = `<p> ${error.message} </p>`;  
 }  


  
function getWeather(London){  
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${London}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}`;  
 
 
    //     console.log(api) }
 fetch(api)  
        .then(function(response){  
            let data = response.json();  
            return data;  
        })  
    .then(function(data){  
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);  
            weather.description = data.weather[0].description;  
            weather.iconId = data.weather[0].icon;  
            weather.city = data.name;  
            weather.country = data.sys.country;  
        })  
        .then(function(){  
            displayWeather();  
        }); 
}  
  
function displayWeather(){  
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;  
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;  
    descElement.innerHTML = weather.description;  
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;  
}  
}
$(document).ready(function(){
     $("#GetWeatherInfo").click(function(){
          var city=$("#city").val();
     //your API key
     var key='5592128f62ae0bf71e7b939a95d8465c'; 

     $.ajax({
          url:'http://api.openweathermap.org/data/2.5/weather',
          dataType:'json',
          type:'GET',
          data:{q:city ,appid:key},

          success:function(data){
              var content = '';                    
              $.each(data.weather, function (index, val) {
                  var temperature = Math.round(data.main.temp);
                  var celcious = temperature - 273;
                  var humidity = data.main.humidity;
                  var weathercondition = data.weather[0].main;
                  var description = data.weather[0].description;
                  var icon = data.weather[0].icon+'.png';
                  content += '<p><b> Temperature : ' + celcious + '&deg; C</b></p>';
                  content += '<p><b> Humidity : ' + humidity + '</b></p>';
                  content += '<p><b> Weather : ' + weathercondition + '[' + description + ']' + '</b></p>';
                  content += '<p><img src=http://openweathermap.org/img/wn/' + icon + '>' + '</p>';
               });
               $("#show").html(content);
          }
     });
});
});

