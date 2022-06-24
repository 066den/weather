import { weatherApi } from './../services/WeatherService';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import city from './reducers/cities/CitySlice';

const syncWithLocalStorage = (store: any) => (next: any) => (action: any) => {
  const result = next(action);

  if (action.type === 'city/addCity') {
    localStorage.setItem(
      'cities',
      JSON.stringify(store.getState().city.cities)
    );
  }
  return result;
};

const rootReducer = combineReducers({
  city,
  [weatherApi.reducerPath]: weatherApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        weatherApi.middleware,
        syncWithLocalStorage
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
