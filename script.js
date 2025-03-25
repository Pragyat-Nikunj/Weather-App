// Import CONFIG from config.js
import CONFIG from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeather");
  const weatherInfo = document.getElementById("weatherInfo");
  const cityName = document.getElementById("cityName");
  const Temperature = document.getElementById("temperature");
  const Description = document.getElementById("weatherCondition");
  const errorMessage = document.getElementById("errorMessage");

  // Get API key from CONFIG object
  const API_KEY = CONFIG.WEATHER_API_KEY;

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return "";

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  /*************************<MAIN PART OF API HANDLING PROJECT> *************************/
  async function fetchWeatherData(city) {
    //gets Data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City Not found!");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityName.textContent = name;
    Temperature.textContent = `Temperature: ${main.temp}`;
    Description.textContent = `Description: ${weather[0].description}`;
    //unlock display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
