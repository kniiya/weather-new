import { useState } from "react";
import "./WeatherApp.css"; // Import the CSS file for styling

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  name: string;
}

const WeatherApp = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("Tokyo"); // Default city
  const [error, setError] = useState<string | null>(null);
  const apiKey = "5213cdfc12d769901ace0fde782abcad";

  const fetchWeatherData = async (city: string) => {
    if (!city) {
      setError("City name cannot be empty");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${encodeURIComponent(apiKey)}`
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error("Invalid API key");
        else if (response.status === 404) throw new Error("City not found");
        else throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setWeather(data);
      setError(null); // Clear error
    } catch (err: any) {
      console.error("Error fetching weather data:", err.message);
      setError(err.message); // Set error message in state
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    fetchWeatherData(city);
  };

  return (
    <div className="weather-app">
      <h1>Weather in {selectedCity}</h1>
      {error ? (
        <div className="error">{error}</div>
      ) : weather ? (
        <div className="weather-info">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
              color={weather.weather[0].icon === "01n" ? "red" : "black"}
            />
          </div>
          <p className="temperature">{weather.main.temp}°C</p>
          <p>
            Location: {weather.name}, {weather.sys.country}
          </p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <div className="loading">Loading weather data...</div>
      )}
      <select
        className="city-select"
        value={selectedCity}
        onChange={handleCityChange}
      >
        <option value="Tokyo">Tokyo</option>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Paris">Paris</option>
        <option value="Berlin">Berlin</option>
        <option value="Sydney">Sydney</option>
        <option value="Mumbai">Mumbai</option>
      </select>
    </div>
  );
};

export default WeatherApp;
