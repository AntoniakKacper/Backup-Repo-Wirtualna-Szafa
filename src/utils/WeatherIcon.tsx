import {
  ColdIcon,
  RainIcon,
  SunnyIcon,
  WarmIcon,
} from "pages/Weather/styles/WeatherStyles";

export const GetWeatherIcon = (weather: any) => {
  switch (weather.weather) {
    case "Hot":
      return <SunnyIcon />;
    case "Warm":
      return <WarmIcon />;
    case "Cold":
      return <ColdIcon />;
    case "Rain":
      return <RainIcon />;
    default:
      return null;
  }
};
