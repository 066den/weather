import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CitiesList from '../../components/CitiesList';
import { citySlice } from '../../store/reducers/cities/CitySlice';
import { ICity } from '../../types/ICity';

const CitiesPage: FC = () => {
	const dispatch = useDispatch();
	const { addCities } = citySlice.actions;
	useEffect(() => {
		dispatch(
			addCities(JSON.parse(localStorage.getItem('cities') || '[]') as ICity[])
		);
	}, []);
	return <CitiesList />;
};

export default CitiesPage;
