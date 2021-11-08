
  
const weather = {};  
    
const key = "5592128f62ae0bf71e7b939a95d8465c";  

if('geolocation' in navigator){  
    navigator.geolocation.getCurrentPosition(setPosition, showError);  
}else{  
    notificationElement.style.display = "block";  
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";  
}  
  
function setPosition(position){  
    let latitude = position.coords.latitude;  
    let longitude = position.coords.longitude;  
      
    getWeather(latitude, longitude);  
}  
  
function showError(error){  
    notificationElement.style.display = "block";  
    notificationElement.innerHTML = `<p> ${error.message} </p>`;  
}  
  
function getWeather(latitude, longitude){  
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}`;  
 

     console.log(api) }

