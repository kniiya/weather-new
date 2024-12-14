import { useState } from "react";
import "./WeatherApp.css"; // Import the CSS file for styling

import html2canvas from "html2canvas";

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

interface ForecastData {
  dt: number; // Unix timestamp
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
}

const WeatherApp2 = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("Tokyo"); // Default city
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  // 型エラー回避のためのガード
  if (!apiKey) {
    throw new Error("APIキーが設定されていません");
  }

  const fetchWeatherByLatLng = async (
    latitude: number,
    longitude: number
  ): Promise<WeatherData> => {
    try {
      // URLSearchParams を使ってパラメータを組み立てる
      const searchParams = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: "metric",
        appid: apiKey,
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${searchParams.toString()}`
      );

      if (!response.ok)
        throw new Error("Failed to fetch weather data by coordinates");

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error("なんかようわからんけどエラー:", err.message);
      throw err;
    }
  };

  const fetchWeatherData = async (
    city: string
  ): Promise<WeatherData | null> => {
    if (!city) {
      setError("City name cannot be empty");
      return null;
    }

    try {
      const searchParams = new URLSearchParams({
        q: city,
        units: "metric",
        appid: apiKey,
      });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${searchParams.toString()}`
      );

      if (!response.ok) {
        if (response.status === 401) throw new Error("Invalid API key");
        else if (response.status === 404) throw new Error("City not found");
        else throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      console.error("ようわからんけどエラー:", err.message);
      setError(err.message);
      return null;
    }
  };

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const city = event.target.value;
    setSelectedCity(city);
    const data = fetchWeatherData(city);
    if (data) {
      setWeather(await data);
    }
  };

  // 横浜市の緯度・経度をハードコーディングしておく
  const handleYokohamaWeather = async () => {
    setSelectedCity("Yokohama");
    const data = fetchWeatherByLatLng(35.4437, 139.638);
    if (data) {
      setWeather(await data);
    }
  };

  const fetchYokohamaForecast = async () => {
    setLatitude(35.4437);
    setLongitude(139.638);
    setSelectedCity("Yokohama");

    fetchForecast();
  };

  // 予報の場合エンドポイントが違うので、出し分けする
  const fetchForecast = async () => {
    try {
      // URLSearchParams を使ってパラメータを組み立てる
      const searchParams = new URLSearchParams({
        lat: latitude.toString(),
        lon: longitude.toString(),
        units: "metric",
        appid: apiKey,
      });

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?${searchParams.toString()}`
      );

      if (!response.ok) throw new Error("Failed to fetch 24-hour forecast");

      const data = await response.json();
      const hourlyForecast: ForecastData[] = data.list.slice(0, 8); // 8つの3時間ごとのデータを取得

      setForecast(hourlyForecast);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching 24-hour forecast:", err.message);
      setError(err.message);
    }
  };

  // 画像出力用の関数
  const handleDownloadImage = async () => {
    const forecastContainer = document.getElementById("forecast-container");
    if (!forecastContainer) return;

    try {
      const canvas = await html2canvas(forecastContainer, { useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${selectedCity}-24-hour-forecast.png`;
      link.click();
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setLatitude(value);
    }
  };

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setLongitude(value);
    }
  };

  const fetchCustomForecast = async () => {
    setSelectedCity("Custom Point");
    fetchForecast();
  };

  return (
    <div className="weather-app">
      <h1>Weather in {selectedCity}</h1>
      {/* エラー・ロード・正常系の順に記載 */}
      {error ? (
        <div className="error">{error}</div>
      ) : !weather ? (
        <div className="loading">Loading weather data...</div>
      ) : (
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
      <button onClick={handleYokohamaWeather}>Get Yokohama Weather</button>

      <button onClick={fetchYokohamaForecast}>
        Get 24-hour Forecast for Yokohama
      </button>
      <br></br>
      <div className="coordinate-inputs">
        <div className="input-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            id="latitude"
            type="number"
            value={latitude || ""}
            onChange={handleLatitudeChange}
            step="0.01"
            placeholder="Enter latitude"
          />
        </div>
        <div className="input-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            id="longitude"
            type="number"
            value={longitude || ""}
            onChange={handleLongitudeChange}
            step="0.01"
            placeholder="Enter longitude"
          />
        </div>
        <button onClick={fetchCustomForecast} className="fetch-button">
          Get Forecast
        </button>
      </div>

      {forecast.length > 0 && (
        <div id="forecast-container" className="forecast-container">
          <h2>24-hour Forecast for {selectedCity}</h2>
          {forecast.map((entry) => (
            <div key={entry.dt} className="forecast-item">
              <p>{new Date(entry.dt * 1000).toLocaleTimeString()}</p>
              {/* CORS（Cross-Origin Resource Sharing）制限を外してみる */}
              <img
                src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                alt="Weather icon"
                crossOrigin="anonymous" // CORS設定
              />
              <p>{entry.main.temp}°C</p>
              <p>{entry.weather[0].description}</p>
              <br />
            </div>
          ))}
          <button onClick={handleDownloadImage}>
            天気予報をダウンロード！
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherApp2;
