import React, { FC } from 'react';
import { Grid } from '@mui/material';

import CityItem from './CityItem';
import { useAppSelector } from '../../hooks/redux';

const CitiesList: FC = () => {
	const { cities } = useAppSelector(state => state.city);

	return (
		<Grid container justifyContent='center' spacing={2}>
			{cities.map(city => (
				<CityItem key={city.id} city={city} />
			))}
		</Grid>
	);
};

export default CitiesList;
