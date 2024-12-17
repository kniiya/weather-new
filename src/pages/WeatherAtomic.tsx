// pages/Weather3.tsx
import { useState } from "react";
import { WeatherPageTemplate } from "../templates/WeatherPageTemplate";
import { LocationControls } from "../organisms/LocationControls";
import { CitySelector } from "../molecules/CitySelector";
import { CoordinateInput } from "../molecules/CoordinateInput";
import { Button } from "../atoms/Button";
import { useWeather } from "../hooks/useWeather";
import type { WeatherData, ForecastData } from "../types/weather";
import "../styles/Weather3.css";
import html2canvas from "html2canvas";

export const WeatherAtomic = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("Tokyo");
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    throw new Error("APIキーが設定されていません");
  }

  const { fetchWeatherData, fetchWeatherByLatLng, fetchForecast } =
    useWeather(apiKey);

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const city = event.target.value;
    setSelectedCity(city);
    try {
      const data = await fetchWeatherData(city);
      if (data) {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleYokohamaWeather = async () => {
    setSelectedCity("Yokohama");
    try {
      const data = await fetchWeatherByLatLng(35.4437, 139.638);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
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

  const handleFetchForecast = async () => {
    try {
      const forecastData = await fetchForecast(latitude, longitude);
      setForecast(forecastData);
      setSelectedCity("Custom Location");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    }
  };

  const handleDownloadImage = async () => {
    const forecastContainer = document.getElementById("forecast-container");
    if (!forecastContainer) return;

    try {
      const canvas = await html2canvas(forecastContainer, { useCORS: true });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${selectedCity}-weather-forecast.png`;
      link.click();
    } catch (error) {
      setError("画像のダウンロードに失敗しました");
    }
  };

  return (
    <WeatherPageTemplate
      weather={weather}
      selectedCity={selectedCity}
      forecast={forecast}
      onDownload={handleDownloadImage}
      error={error}
    >
      <LocationControls>
        <CitySelector selectedCity={selectedCity} onChange={handleCityChange} />
        <Button onClick={handleYokohamaWeather}>Get Yokohama Weather</Button>
        <CoordinateInput
          latitude={latitude}
          longitude={longitude}
          onLatitudeChange={handleLatitudeChange}
          onLongitudeChange={handleLongitudeChange}
        />
        <Button onClick={handleFetchForecast}>
          Get Custom Location Forecast
        </Button>
      </LocationControls>
    </WeatherPageTemplate>
  );
};

export default WeatherAtomic;
