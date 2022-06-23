export interface ICurrentWeather {
	temp: number | any;
	feels_like: number | any;
	pressure: number;
	humidity: number;
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
}

export interface IShortWeather {
	main: ICurrentWeather;
	weather: IDescription[];
	wind: IWind;
	visibility: any;
}
