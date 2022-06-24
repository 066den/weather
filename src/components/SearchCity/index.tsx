import React, { FC, useState } from 'react';
import {
	Button,
	Divider,
	InputBase,
	Paper,
	Box,
	FormControl,
	FormHelperText,
} from '@mui/material';

import SearchCityList from './SearchCityList';
import CityService from '../../services/CityService';
import { ICity } from '../../types/ICity';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { citySlice } from '../../store/reducers/cities/CitySlice';

const SearchCity: FC = () => {
	const dispatch = useAppDispatch();
	const { addCity } = citySlice.actions;
	const { cities } = useAppSelector(state => state.city);

	const [search, setSearch] = useState('');
	const [error, setError] = useState('');
	const [foundCities, setFoundCities] = useState<ICity[]>([]);

	const fetchCities = async (name: string) => {
		setError('');
		setFoundCities([]);
		try {
			const response = await CityService.getCities(name);
			if (response.data.length) {
				setFoundCities(response.data);
			} else {
				setError('Not found. To make search more precise put the city`s name');
			}
		} catch (e) {
			setError('The request failed');
		}
	};

	const handleAddCity = (city: ICity) => {
		setFoundCities([]);
		setSearch('');
		const index = cities.findIndex(el => {
			return el.lat === city.lat && el.lon === city.lon;
		});
		if (index === -1) {
			dispatch(addCity(city));
		} else {
			setError('The request failed');
		}
	};

	const handlerSearch = () => {
		fetchCities(search);
	};

	const handleKey = (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === 'Enter') {
			fetchCities(search);
		}
	};

	return (
		<Box sx={{ position: 'relative' }}>
			<Paper
				sx={{
					p: '2px 4px',
					display: 'flex',
					alignItems: '43uyhjg',
					width: 500,
				}}
			>
				<FormControl sx={{ ml: 1, flex: 1, justifyContent: 'center' }}>
					<InputBase
						placeholder='Search city...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						onKeyDown={handleKey}
					/>
					{error && <FormHelperText>{error}</FormHelperText>}
				</FormControl>

				<Divider sx={{ height: 38, m: 0.5 }} orientation='vertical' />
				<Button variant='contained' sx={{ m: '5px' }} onClick={handlerSearch}>
					Search
				</Button>
			</Paper>

			<SearchCityList
				citySearchResult={foundCities}
				handleAddCity={handleAddCity}
			/>
		</Box>
	);
};

export default SearchCity;
