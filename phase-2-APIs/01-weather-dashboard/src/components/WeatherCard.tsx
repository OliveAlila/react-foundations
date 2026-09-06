import type { Location, WeatherData } from "../types/weather";

interface WeatherCardProps {
  location: Location;
  weather: WeatherData;
}

function getWeatherDescription(code: number): string {
  if (code === 0) return "Clear sky";

  if (code === 1 || code === 2 || code === 3) {
    return "Partly cloudy";
  }

  if (code === 45 || code === 48) {
    return "Foggy";
  }

  if (code >= 51 && code <= 57) {
    return "Drizzle";
  }

  if (code >= 61 && code <= 67) {
    return "Rain";
  }

  if (code >= 71 && code <= 77) {
    return "Snow";
  }

  if (code >= 80 && code <= 82) {
    return "Rain showers";
  }

  if (code >= 95) {
    return "Thunderstorm";
  }

  return "Unknown";
}

function getWeatherIcon(code: number): string {
  if (code === 0) return "☀️";

  if (code === 1 || code === 2 || code === 3) {
    return "⛅";
  }

  if (code === 45 || code === 48) {
    return "🌫️";
  }

  if (code >= 51 && code <= 67) {
    return "🌧️";
  }

  if (code >= 71 && code <= 77) {
    return "❄️";
  }

  if (code >= 80 && code <= 82) {
    return "🌦️";
  }

  if (code >= 95) {
    return "⛈️";
  }

  return "🌡️";
}

function WeatherCard({ location, weather }: WeatherCardProps) {
  const description = getWeatherDescription(weather.weatherCode);
  const icon = getWeatherIcon(weather.weatherCode);

  return (
    <div className="weather-card">
      <div className="location">
        <h2>{location.name}</h2>
        <p>{location.country}</p>
      </div>

      <div className="main-weather">
        <span className="weather-icon">{icon}</span>

        <div>
          <p className="temperature">
            {Math.round(weather.temperature)}°C
          </p>

          <p className="description">{description}</p>
        </div>
      </div>

      <div className="weather-details">
        <div>
          <span>Feels like</span>
          <strong>
            {Math.round(weather.apparentTemperature)}°C
          </strong>
        </div>

        <div>
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>

        <div>
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;