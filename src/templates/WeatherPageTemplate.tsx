import { WeatherData, ForecastData } from "../types/weather";
import { ErrorMessage } from "../atoms/ErrorMessage";
import { CurrentWeather } from "../organisms/CurrentWeather";
import { WeatherForecast } from "../organisms/WeatherForecast";

interface WeatherPageTemplateProps {
  weather: WeatherData | null;
  error?: string | null;
  selectedCity: string;
  forecast: ForecastData[];
  children?: React.ReactNode;
  onDownload?: () => void;
}

export const WeatherPageTemplate: React.FC<WeatherPageTemplateProps> = ({
  weather,
  error,
  selectedCity,
  forecast,
  children,
  onDownload,
}) => (
  <div className="weather-app">
    <h1>Weather in {selectedCity}</h1>
    {error ? (
      <ErrorMessage message={error} />
    ) : (
      <>
        {weather && <CurrentWeather weather={weather} />}
        {children}
        {forecast.length > 0 && (
          <WeatherForecast
            forecast={forecast}
            selectedCity={selectedCity}
            onDownload={onDownload || (() => {})}
          />
        )}
      </>
    )}
  </div>
);
