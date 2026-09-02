const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const quickBtns = document.querySelectorAll('.quick-btn');
const weatherContainer = document.getElementById('weatherContainer');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('errorMessage');

// OpenWeatherMap API key (Free tier)
const API_KEY = 'YOUR_API_KEY_HERE'; // Get free key from https://openweathermap.org/api
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Event listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        searchWeather(city);
        searchInput.value = '';
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        searchWeather(btn.dataset.city);
    });
});

// Search weather
function searchWeather(city) {
    if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please add your OpenWeatherMap API key in script.js');
        return;
    }
    
    showLoading(true);
    hideError();
    weatherContainer.innerHTML = '';
    
    // Fetch current weather
    fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error('City not found');
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            // Fetch forecast
            return fetch(`${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        })
        .then(response => response.json())
        .then(data => {
            displayForecast(data, city);
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => {
            showLoading(false);
        });
}

// Display current weather
function displayWeather(data) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const pressure = data.main.pressure;
    const visibility = (data.visibility / 1000).toFixed(1);
    
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    
    card.innerHTML = `
        <div class="city-name">${data.name}, ${data.sys.country}</div>
        <div class="weather-description">${description}</div>
        <div class="weather-icon">${weatherIcon}</div>
        <div class="temperature">${temp}°C</div>
        <div style="color: #999; margin-bottom: 20px;">Feels like ${feelsLike}°C</div>
        
        <div class="weather-details">
            <div class="detail-item">
                <div class="detail-label">Humidity</div>
                <div class="detail-value">${humidity}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Wind Speed</div>
                <div class="detail-value">${windSpeed.toFixed(1)} m/s</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Pressure</div>
                <div class="detail-value">${pressure} hPa</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Visibility</div>
                <div class="detail-value">${visibility} km</div>
            </div>
        </div>
    `;
    
    weatherContainer.appendChild(card);
}

// Display forecast
function displayForecast(data, city) {
    // Group forecast by day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });
    
    const cards = document.querySelectorAll('.weather-card');
    if (cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        
        let forecastHTML = '<div class="forecast"><div class="forecast-title">5-Day Forecast</div><div class="forecast-items">';
        
        Object.keys(dailyForecasts).slice(1, 6).forEach(date => {
            const item = dailyForecasts[date];
            const temp = Math.round(item.main.temp);
            const icon = getWeatherIcon(item.weather[0].main);
            
            forecastHTML += `
                <div class="forecast-item">
                    <div class="forecast-day">${new Date(item.dt * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</div>
                    <div style="font-size: 20px; margin: 5px 0;">${icon}</div>
                    <div class="forecast-temp">${temp}°C</div>
                </div>
            `;
        });
        
        forecastHTML += '</div></div>';
        lastCard.innerHTML += forecastHTML;
    }
}

// Get weather icon based on condition
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    
    return icons[condition] || '🌤️';
}

// Show/hide loading
function showLoading(show) {
    loadingEl.classList.toggle('active', show);
}

// Show error
function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add('active');
}

// Hide error
function hideError() {
    errorEl.classList.remove('active');
}

// Demo: Show message if API key not set
window.addEventListener('load', () => {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        weatherContainer.innerHTML = '<div class="no-data">⚙️ Please add your OpenWeatherMap API key to use this app. Get a free key at <a href="https://openweathermap.org/api" style="color: white;">openweathermap.org</a></div>';
    }
});