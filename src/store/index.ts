import { weatherApi } from './../services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import city from './reducers/cities/CitySlice';

const rootReducer = combineReducers({
	city,
	[weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(weatherApi.middleware),
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
