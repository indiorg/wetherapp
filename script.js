const weatherApiKey = '036241774914d4af41e288e1352d34d8'; // OpenWeatherMap
const unsplashApiKey = 'KWm8OfFIWI_ILtuI06fzHS6-dcugPasXwyQd1vvPDu4'; // Replace with your Unsplash API key

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert('Please enter a city name.');

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      // Update weather info
      const result = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡️ Temperature: ${data.main.temp}°C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weatherResult').innerHTML = result;

      // Fetch Unsplash image
      const unsplashUrl = `https://api.unsplash.com/photos/random?query=${city}&client_id=${unsplashApiKey}`;

      fetch(unsplashUrl)
        .then(res => res.json())
        .then(imgData => {
          document.body.style.backgroundImage = `url(${imgData.urls.full})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
        })
        .catch(err => {
          console.log('Image not found, using default background');
          document.body.style.backgroundImage = 'none';
        });
    })
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
