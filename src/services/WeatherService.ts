import { ICoords } from './../types/ICity';
import { IShortWeather, IWeather } from './../types/IWeather';
import { apiUrl } from './../constants/apiUrl';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const weatherApi = createApi({
	reducerPath: 'weatherApi',
	baseQuery: fetchBaseQuery({ baseUrl: apiUrl.BASE_API_URL }),
	endpoints: build => ({
		fetchShortWeather: build.query<IShortWeather, ICoords>({
			query: coords => ({
				url: apiUrl.WEATHER_SHORT_API_URL,
				params: {
					lat: coords.lat,
					lon: coords.lon,
					units: 'metric',
					appid: apiUrl.API_KEY,
				},
			}),
		}),
		fetchWeather: build.query<IWeather, ICoords>({
			query: coords => ({
				url: '/',
				params: {
					lat: coords.lat,
					lon: coords.lon,
					units: 'metric',
					appid: apiUrl.API_KEY,
				},
			}),
		}),
	}),
});
