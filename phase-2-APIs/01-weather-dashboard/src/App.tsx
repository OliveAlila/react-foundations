import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import type { Location, WeatherData } from "./types/weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Find the city's coordinates
      const locationResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}&count=1&language=en&format=json`
      );

      if (!locationResponse.ok) {
        throw new Error("Failed to find location.");
      }

      const locationData = await locationResponse.json();

      if (!locationData.results || locationData.results.length === 0) {
        throw new Error("City not found. Try another city.");
      }

      const result = locationData.results[0];

      const newLocation: Location = {
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
      };

      // Step 2: Get the weather for those coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${result.latitude}&longitude=${result.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
      );

      if (!weatherResponse.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const weatherData = await weatherResponse.json();

      const newWeather: WeatherData = {
        temperature: weatherData.current.temperature_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
        humidity: weatherData.current.relative_humidity_2m,
        apparentTemperature:
          weatherData.current.apparent_temperature,
      };

      setLocation(newLocation);
      setWeather(newWeather);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }

      setLocation(null);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="weather-container">
        <header>
          <h1>Weather Dashboard</h1>
          <p>Search for a city to see its current weather.</p>
        </header>

        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={searchWeather}
          loading={loading}
        />

        {error && <p className="error">{error}</p>}

        {location && weather && (
          <WeatherCard
            location={location}
            weather={weather}
          />
        )}

        {!location && !weather && !loading && !error && (
          <div className="empty-state">
            <p>🌍 Search for a city to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;