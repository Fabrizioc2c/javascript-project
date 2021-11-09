const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const weather = {};

weather.temperature = {
    unit: "celsius"
}


const key = "5592128f62ae0bf71e7b939a95d8465c";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}&units=metric`;

    //emperature is available in Fahrenheit, Celsius and Kelvin units.

    //For temperature in Fahrenheit use units=imperial
    //For temperature in Celsius use units=metric
    //     console.log(api) }
    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
        //weather.temperature.value = Math.floor(data.main.temp - KELVIN);  
            weather.temperature.value = data.main.temp;
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
