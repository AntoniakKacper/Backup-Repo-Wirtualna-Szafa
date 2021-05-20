import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  getOutfitByWeather,
  getUserOutfits,
} from "store/actions/outfitActions";
import { Outfit } from "store/types/outfitTypes";
import { OutfitCard } from "../Wardrobe/Outfits/OutfitCard";
import {
  DateInfo,
  WeatherContianer,
  Wrapper,
  Degrees,
  CloudContainer,
  WarmIcon,
  SunnyIcon,
  ColdIcon,
  RainIcon,
  StyledPragraph,
} from "./styles/WeatherStyles";

interface WeatherProps {}

interface weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherData {
  weather: weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

const api = {
  key: "aa4fbdf8abe3e83ff9a3637537b11b38",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const Weather: React.FC<WeatherProps> = () => {
  const [weather, setWeather] = useState<IWeatherData>();
  const { outfits } = useSelector((state: RootState) => state.outfit);
  const { user } = useSelector((state: RootState) => state.auth);

  const action = useDispatch();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates);
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  };

  const getCoordinates = (position: any) => {
    getCurrentWeather(position.coords.latitude, position.coords.longitude);
    //getCurrentWeather("-7.778050", "110.585540");
  };

  const getCurrentWeather = (latitude: string, longitude: string) => {
    fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        user &&
          action(getOutfitByWeather(getWeather(result) as string, user.id));
      });
  };

  useEffect(() => {
    getLocation();

    return () => {
      setWeather(undefined);
    };
  }, []);

  const dateBuilder = (d: any) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getWeather = (weather: IWeatherData): string | undefined => {
    const temperature = Math.round(weather.main.temp);
    const rain = weather.weather[0].main;
    if (rain === "Rain") {
      return "Rain";
    } else {
      switch (true) {
        case temperature >= 20:
          return "Hot";
        case temperature < 20 && temperature >= 10:
          return "Warm";
        case temperature < 10:
          return "Cold";
        default:
          console.log("Weather error");
      }
    }
  };

  const GetWeatherIcon = (weather: any) => {
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

  return (
    <Wrapper>
      {weather && (
        <WeatherContianer>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <DateInfo>{dateBuilder(new Date())}</DateInfo>
          <Degrees>{`${Math.round(weather.main.temp)}° C`}</Degrees>
          <CloudContainer>
            <p>{getWeather(weather)}</p>
            <GetWeatherIcon weather={getWeather(weather)} />
          </CloudContainer>
        </WeatherContianer>
      )}

      <StyledPragraph>Outfits that you might wear</StyledPragraph>

      {outfits?.map((outfit: Outfit) => (
        <OutfitCard outfit={outfit} key={outfit.id} />
      ))}
    </Wrapper>
  );
};
