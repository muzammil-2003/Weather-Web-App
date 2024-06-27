document.getElementById('check').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '';     // Add your OpenWeatherMap API key here

    if (city === "") {
        document.getElementById('Result').innerHTML = '<p>Please enter city name.</p>';
        document.getElementById('weather-info').classList.add('weather-card');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (response.status != 200) {
                document.getElementById('weather-info').classList.add('weather-card');
                throw new Error('Please enter a valid city name.');
            }
            return response.json();
        })
        .then(data => {
            const cityName = data.name;
            const temperature = data.main.temp;
            const country = data.sys.country;
            const desc = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            
            document.getElementById('weather-info').classList.remove('weather-card');
            document.getElementById('Result').innerHTML = "";

            document.getElementById('cityName').innerHTML = `<p>City: ${cityName}</p>`;
            document.getElementById('desc').innerHTML = `<p>${desc}</p>`;
            document.getElementById('temp').innerHTML = `<p>Temperature: ${temperature} °C</p>`;
            document.getElementById('country').innerHTML = `<p>Country: ${country}</p>`;
            document.getElementById('humidity').innerHTML = `<p>Humidity: ${humidity}%</p>`;
            document.getElementById('wind').innerHTML = `<p>Wind Speed: ${windSpeed} m/s</p>`;

        })
        .catch(error => {
            document.getElementById('Result').innerHTML = `<p>${error.message}</p>`;
            console.error('Error fetching weather data:', error);
        });
});
