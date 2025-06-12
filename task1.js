async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorElement = document.getElementById("errorMessage");
  const weatherCard = document.getElementById("weatherInfo");

  // Reset UI
  errorElement.classList.add("hidden");
  weatherCard.classList.add("hidden");

  if (!city) {
    errorElement.textContent = "Please enter a city name.";
    errorElement.classList.remove("hidden");
    return;
  }

  const apiKey = 'bf3e27067f21112cf39c1aea462f96fe';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    weatherCard.classList.remove("hidden");
  } catch (error) {
    errorElement.textContent = "❌ " + error.message;
    errorElement.classList.remove("hidden");
    console.error("Error:", error);
  }
}
