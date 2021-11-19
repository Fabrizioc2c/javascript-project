const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const localWeatherBtn = document.querySelector(".local-weather-btn");

// Get the modal
const modal = document.getElementById("weather-modal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// variables of the form

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
var inputValue;

const weatherData = [];
const weather = {};

weather.temperature = {
    unit: "celsius",
};

const key = "5592128f62ae0bf71e7b939a95d8465c";

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    form.addEventListener("submit", function () {
        inputValue = input.value;
    });
    getWeather(latitude, longitude, inputValue);
}

form.addEventListener("submit", function () {
    inputValue = input.value;
    getWeather("", "", inputValue);
});

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude, inputValue) {
    var api = `http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${"5592128f62ae0bf71e7b939a95d8465c"}&units=metric`;

    // if (inputValue != null){
    //     var api = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}&units=metric`;

    // } else {
    //     var api = `http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}&units=metric`;

    // }

    // let api = `http://api.openweathermap.org/data/2.5/weather?&lat=${latitude}&lon=${longitude}&appid=${'5592128f62ae0bf71e7b939a95d8465c'}&units=metric`;
    // https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric
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

            if (!data.main) return;

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
    localWeatherBtn.querySelector("span").textContent = weather.city;
    localWeatherBtn.querySelector("sup").textContent = weather.country;
    localWeatherBtn.classList.remove("d-none");
    // iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    // tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    // descElement.innerHTML = weather.description;
    // locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// function
//function changeBackground() {
  //  var div_card = document.querySelector(".cards");
   // var div_info = document.querySelector(".info");
   // div_card.style.background = "red";
   // div_info.style.display = "block";
//}

const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".city-section .cities");

const apiKey = "5592128f62ae0bf71e7b939a95d8465c";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputVal = input.value;

    //check if there's already a city
    const listItems = list.querySelectorAll("city-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter((el) => {
            let content = "";
          
            if (inputVal.includes(",")) {
                
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
               
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent}  `;
            form.reset();
            input.focus();

            return;
        }
    }

    //city  here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${
  weather[0]["icon"]
}@2x.png`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
      <button class="button-card" type="button">
        <h2 class="city-name">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
      `;
            li.innerHTML = markup;
            li.addEventListener("click", (e) => {
                const cityEl = modal.querySelector(".city-name");
                const tempEl = modal.querySelector(".city-temp");
                const iconEl = modal.querySelector(".weather-icon");
                const weatherText = modal.querySelector(".weather-text");
                cityEl.querySelector("span").textContent = name;
                cityEl.querySelector("sup").textContent = sys.country;
                tempEl.innerHTML = `<span>${main.temp}</span><sup>&deg;C</sup>`;
                iconEl.src = `icons/${weather[0].icon}.png`;
                weatherText.textContent = weather[0].description;
                modal.style.display = "flex";
            });
            list.appendChild(li);

            // weatherData.push({
            //   temperature:main.temp,
            //   city:name,
            //   country:sys.country,
            //   iconId: data.weather[0].icon,
            //   description:weather[0].description
            // })
            // console.log(weatherData)
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😑";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});

// local weather modal

console.log(weather);
localWeatherBtn.addEventListener("click", () => {
    const cityEl = modal.querySelector(".city-name");
    const tempEl = modal.querySelector(".city-temp");
    const iconEl = modal.querySelector(".weather-icon");
    const weatherText = modal.querySelector(".weather-text");
    cityEl.querySelector("span").textContent = weather.city;
    cityEl.querySelector("sup").textContent = weather.country;
    tempEl.innerHTML = `<span>${weather.temperature.value}</span><sup>&deg;C</sup>`;
    iconEl.src = `icons/${weather.iconId}.png`;
    weatherText.textContent = weather.description;
    modal.style.display = "flex";
});
