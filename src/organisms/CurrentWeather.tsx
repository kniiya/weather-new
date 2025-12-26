import { WeatherIcon } from "../atoms/WeatherIcon";
import { WeatherDetail } from "../molecules/WeatherDetail";
import type { WeatherData } from "../types/weather";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2>
          {weather.name}, {weather.sys.country}
        </h2>
      </div>
      <div className="weather-content">
        <WeatherIcon
          iconCode={weather.weather[0].icon}
          alt={weather.weather[0].description}
        />
        <WeatherDetail
          temperature={weather.main.temp}
          feelsLike={weather.main.feels_like}
          humidity={weather.main.humidity}
          windSpeed={weather.wind.speed}
          description={weather.weather[0].description}
        />
      </div>
    </div>
  );
};
