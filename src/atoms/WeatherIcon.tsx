interface WeatherIconProps {
  iconCode: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  alt = "Weather icon",
  size = "medium",
  className,
}) => {
  const getIconSize = () => {
    switch (size) {
      case "small":
        return "@1x";
      case "large":
        return "@4x";
      default:
        return "@2x";
    }
  };

  return (
    <div className={`weather-icon ${size} ${className || ""}`}>
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}${getIconSize()}.png`}
        alt={alt}
        crossOrigin="anonymous"
      />
    </div>
  );
};
