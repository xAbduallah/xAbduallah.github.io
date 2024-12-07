var country = document.getElementById('countryInput');
var searchCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;

function fetchWeather(icon) {
    if (country.value)
        searchCountry = country.value;
    country.value = '';
    try {
        var myRequest = new XMLHttpRequest();
        myRequest.open('GET', `https://api.weatherapi.com/v1/forecast.json?key=d159df1f3052418284b180548240712&q=${searchCountry}&days=3`);
        myRequest.send();
        myRequest.addEventListener('load', function () {
            if (myRequest.readyState != 4) {
                throw new Error('City not found or API error');
            }
            else {
                displayWeather(JSON.parse(myRequest.response));
            }
        });
    } catch (error) {
        alert('Error: ' + error.message);
    }
}
function displayWeather(data) {
    var weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = `<h1 class="text-center mb-4">${searchCountry}</h1>`;

    var forecasts = data.forecast.forecastday;

    for (var i = 0; i < forecasts.length; i++) {
        var forecast = forecasts[i];
        var dayName = i === 0 ? 'Today' : new Date(forecast.date).toLocaleDateString('en-US', { weekday: 'long' });
        var weatherCard = `
        <div class="col-md-4">
        <div class="weather-card p-4 text-center">
        <div class="weather-header">${dayName}</div>
        <img src="https:${forecast.day.condition.icon}" class="weather-icon my-3" alt="${forecast.day.condition.text}">
        <h3>${data.location.name}</h3>
        <h4>${forecast.day.avgtemp_c}°C</h4>
        <p class="text-capitalize">${forecast.day.condition.text}</p>
        </div>
        </div>
    `;
        weatherResults.innerHTML += weatherCard;
    }
}
function displayCurLocation() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.ipregistry.co/?key=ira_b9e57QlTbO4BTYEBqtpV508sHIWtjg2aQWpk');
    request.send();

    request.addEventListener('load', function () {
        if (request.readyState == 4) {
            var result = JSON.parse(request.response);
            searchCountry = result.location.country.name;
            fetchWeather();
        }
    });
}

displayCurLocation();
