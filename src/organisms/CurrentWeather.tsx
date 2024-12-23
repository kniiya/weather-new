import { Box, Heading, Stack, VStack } from "@chakra-ui/react";
import { WeatherIcon } from "../atoms/WeatherIcon";
import { WeatherDetail } from "../molecules/WeatherDetail";
import type { WeatherData } from "../types/weather";

interface CurrentWeatherProps {
  weather: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  return (
    <Box p={6} borderRadius="lg" boxShadow="lg" bg="white">
      <VStack spacing={4}>
        <Heading size="md">
          {weather.name}, {weather.sys.country}
        </Heading>
        <Stack direction="row" alignItems="center" gap={4}>
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
        </Stack>
      </VStack>
    </Box>
  );
};
