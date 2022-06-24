export interface ICurrentWeather {
  temp: number | any;
  feels_like: number | any;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  visibility: number | any;
  dt: number;
  weather: IDescription[];
}

export interface IDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface IWeather {
  current: ICurrentWeather;
  hourly: ICurrentWeather[];
}

export interface IShortWeather {
  main: ICurrentWeather;
  weather: IDescription[];
  wind: IWind;
  visibility: any;
}
