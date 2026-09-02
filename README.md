# Weather Dashboard

A beautiful weather dashboard application that fetches real-time weather data from the OpenWeatherMap API.

## Features

🌤️ **Real-time Weather Data**: Current temperature, weather conditions, and more
🌍 **Search Any City**: Search for weather in any city worldwide
📅 **5-Day Forecast**: See weather predictions for the next 5 days
⚡ **Quick Access Buttons**: Preset buttons for popular cities
📱 **Responsive Design**: Works on desktop, tablet, and mobile
✨ **Beautiful UI**: Modern design with smooth animations
🎨 **Weather Icons**: Visual representation of weather conditions

## Weather Information Displayed

- Current temperature and "feels like" temperature
- Weather condition (Clear, Cloudy, Rainy, etc.)
- Humidity percentage
- Wind speed
- Atmospheric pressure
- Visibility distance
- 5-day forecast with daily temperatures

## Getting Started

### Prerequisites

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up at https://openweathermap.org
   - Navigate to API keys section
   - Copy your free API key

### Installation

1. Clone the repository
2. Open `script.js` and replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const API_KEY = 'your-api-key-here';
   ```
3. Open `index.html` in your web browser
4. Start searching for weather!

## How to Use

1. **Search by City Name**:
   - Type a city name in the search box
   - Press Enter or click the search button

2. **Use Quick Buttons**:
   - Click one of the preset city buttons (New York, London, Tokyo, Sydney)

3. **View Weather Details**:
   - See current weather and forecast information
   - Scroll to see the 5-day forecast

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- JavaScript (Vanilla)
- OpenWeatherMap API
- Font Awesome Icons

## API Information

- **API Provider**: OpenWeatherMap
- **Free Tier**: Includes current weather and 5-day forecast
- **Rate Limit**: 60 calls/minute for free tier
- **Documentation**: https://openweathermap.org/api

## Browser Compatibility

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Opera 47+

## License

MIT License

## Notes

- Remember to keep your API key private
- For production use, consider backend proxy to hide API key
- Temperatures are displayed in Celsius by default
- Wind speed is in meters per second (m/s)
