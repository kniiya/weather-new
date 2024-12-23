import { WeatherIcon } from "../atoms/WeatherIcon";
import type { ForecastData } from "../types/weather";
import { Box, VStack, Text } from "@chakra-ui/react";

interface ForecastItemProps {
  data: ForecastData;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ data }) => (
  <Box p={4} borderRadius="md" boxShadow="sm">
    <VStack spacing={2} align="center">
      <Text fontSize="sm">{new Date(data.dt * 1000).toLocaleTimeString()}</Text>
      <WeatherIcon iconCode={data.weather[0].icon} />
      <Text fontSize="lg" fontWeight="bold">
        {data.main.temp}°C
      </Text>
      <Text>{data.weather[0].description}</Text>
    </VStack>
  </Box>
);
