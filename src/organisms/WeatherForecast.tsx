import { ForecastItem } from "../molecules/ForcastItem";
import { Button } from "../atoms/Button";
import { ForecastData } from "../types/weather";

interface WeatherForecastProps {
  forecast: ForecastData[];
  selectedCity: string;
  onDownload: () => void;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecast,
  selectedCity,
  onDownload,
}) => (
  <div id="forecast-container" className="forecast-container">
    <h2>24-hour Forecast for {selectedCity}</h2>
    <div className="forecast-list">
      {forecast.slice(0, 8).map((entry) => (
        <ForecastItem key={entry.dt} data={entry} />
      ))}
    </div>
    <Button onClick={onDownload}>天気予報をダウンロード！</Button>
  </div>
);
