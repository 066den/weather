import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../../../types/ICity';

interface CityState {
	cities: ICity[];
}

const initialState: CityState = {
	cities: [],
};

export const citySlice = createSlice({
	name: 'city',
	initialState,
	reducers: {
		addCity(state, action: PayloadAction<ICity>) {
			state.cities = [...state.cities, action.payload];
			//localStorage.setItem('cities', JSON.stringify(state.cities));
		},
		addCities(state, action: PayloadAction<ICity[]>) {
			state.cities = action.payload;
		},
		deleteCity(state, action: PayloadAction<number>) {
			state.cities = state.cities.filter(city => city.id !== action.payload);
			//localStorage.setItem('cities', JSON.stringify(state.cities));
		},
	},
});

export default citySlice.reducer;
