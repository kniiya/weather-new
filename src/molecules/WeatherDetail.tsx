interface WeatherDetailProps {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export const WeatherDetail: React.FC<WeatherDetailProps> = ({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  description,
}) => {
  return (
    <div className="weather-detail">
      <p className="temperature">{temperature}°C</p>
      <p className="feels-like">体感温度: {feelsLike}°C</p>
      <p className="description">{description}</p>
      <div className="weather-metrics">
        <p className="humidity">湿度: {humidity}%</p>
        <p className="wind">風速: {windSpeed} m/s</p>
      </div>
    </div>
  );
};
