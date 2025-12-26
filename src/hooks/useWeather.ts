import type { WeatherData, ForecastData } from "../types/weather";

export const useWeather = (apiKey: string) => {
  const fetchWeatherByLatLng = async (
    latitude: number,
    longitude: number
  ): Promise<WeatherData> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    return response.json();
  };

  const fetchWeatherData = async (
    city: string
  ): Promise<WeatherData | null> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    return response.json();
  };

  const fetchForecast = async (
    latitude: number,
    longitude: number
  ): Promise<ForecastData[]> => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    return data.list;
  };

  return {
    fetchWeatherByLatLng,
    fetchWeatherData,
    fetchForecast,
  };
};
