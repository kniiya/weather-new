import { Box, Text, VStack, HStack } from "@chakra-ui/react";

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
    <Box p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={2} align="stretch">
        <Text fontSize="3xl">{temperature}°C</Text>
        <Text fontSize="lg">体感温度: {feelsLike}°C</Text>
        <Text>{description}</Text>
        <HStack spacing={4} justify="center">
          <Text>湿度: {humidity}%</Text>
          <Text>風速: {windSpeed} m/s</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
