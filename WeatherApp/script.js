document.addEventListener("DOMContentLoaded", ()=>{
    const card = document.getElementById("weather-info");
    const cityInput = document.getElementById("city-input");
    const getWeather = document.getElementById("get-weather");
    const cityName = document.getElementById("city-name");
    const currentTemp = document.getElementById("curr-temp");
    const weatherCondition = document.getElementById("weather-condition");
    const weatherDescription = document.getElementById("weather-desc");
    const weatherIcon = document.getElementById("weather-icon");
    const Humidity = document.getElementById("humidity");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "34043149a8751f1bae090421fb2ddffd";

getWeather.addEventListener("click", async ()=>{
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error)
        }
    } else {
        displayError("Please enter city");

    }

    cityInput.value = "";
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    const response = await fetch(url);


     if (!response.ok) {
        if (response.status === 404) {
            throw new Error("City not found. Please check spelling or try another location.");
        } else {
            throw new Error("Unable to fetch weather data. Please try again later.");
        }
    }


    const data = await response.json();
    return data;
}

async function displayWeatherInfo(data) {
    console.log(data);
    
    const {name : city, 
        main : {temp, humidity}, 
        weather : [{description, id, main}] } = data;
    
    card.textContent = "";
    card.style.display = "block";

    cityName.textContent = city;
    currentTemp.textContent = `Temperature : ${(temp - 273.15).toFixed(1)}°c`;
    weatherCondition.textContent = `Weather Condition : ${main}`;
    weatherDescription.textContent = description;
    weatherIcon.textContent = getWeatherEmoji(id);
    Humidity.textContent = `Humidity : ${humidity}`;

    card.appendChild(cityName);
    card.appendChild(currentTemp);
    card.appendChild(weatherCondition);
    card.appendChild(weatherDescription);
    card.appendChild(weatherIcon);
    card.appendChild(Humidity);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"
            break;
        
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️"
            break;
        
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"
            break;

        case (weatherId >= 600 && weatherId < 700):
            return "❄️"
            break;

        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"
            break;
        
        case (weatherId === 800):
            return "☀️"
            break;
        
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"
            break;
    
        default:
            return "❓"
            break;
    }
}

function displayError(errorMsg) {
    errorMessage.textContent = errorMsg;
    errorMessage.classList.add("error-message");
    card.appendChild(errorMessage);

    cityName.textContent = "";
    currentTemp.textContent = "";
    weatherCondition.textContent = "";
    weatherDescription.textContent = "";
    weatherIcon.textContent = "";
    Humidity.textContent = "";

    card.style.display = "block";
}
})