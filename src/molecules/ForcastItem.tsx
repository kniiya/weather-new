import { WeatherIcon } from "../atoms/WeatherIcon";
import type { ForecastData } from "../types/weather";
interface ForecastItemProps {
  data: ForecastData;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => (
  <div className="forecast-item">
    <p>{new Date(data.dt * 1000).toLocaleTimeString()}</p>
    <WeatherIcon iconCode={data.weather[0].icon} />
    <p>{data.main.temp}°C</p>
    <p>{data.weather[0].description}</p>
  </div>
);
