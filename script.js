//Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput"); // Fixed this line
const card = document.querySelector(".card");
const apiKey = "8e12073d13a7add1b8c53d7051bf1575";

weatherForm.addEventListener("submit",async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        // Call getWeatherData or other functions here
    }} else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("City not found");

    // Implementation here
}
return await response.json();
}

function displayWeatherInfo(data) {

      const { name: city,
         main: { temp, humidity },
         weather: [ { description, id: weatherId } ] } = data;

     card.textContent = "";
     card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji= document.createElement("p"); 
        
        cityDisplay.textContent = city;
        tempDisplay.textContent = ` ${(temp - 273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(weatherId);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);

        cityDisplay.classList.add("cityDisplay");

    // Implementation here
}

function getWeatherEmoji(WeatherId) {

    switch (true) {
        case WeatherId >= 200 && WeatherId < 300:
            return "⛈️"; // Thunderstorm
        case WeatherId >= 300 && WeatherId < 400:
            return "🌦️";
        case WeatherId >= 500 && WeatherId < 600:
            return "🌧️"; // Rain
        case WeatherId >= 600 && WeatherId < 700:
            return "❄️"; // Snow
        case WeatherId >= 700 && WeatherId < 800:
            return "🌫️"; // Atmosphere (mist, smoke, etc.)
        case WeatherId === 800:
            return "☀️"; // Clear
        case WeatherId > 800 && WeatherId < 900:
            return "☁️"; // Clouds
        default:
            return "🌈"; // Default/fallback emoji
    }
    // Implementation here
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
