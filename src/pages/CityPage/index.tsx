import React, { FC, useEffect } from 'react';
import {
	Box,
	Grid,
	List,
	ListItem,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';

import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { weatherApi } from '../../services/WeatherService';
import { useDate } from '../../hooks/useDate';

import { citySlice } from '../../store/reducers/cities/CitySlice';
import { ICity } from '../../types/ICity';
import HourlyItem from '../../components/HourlyItem';
import { apiUrl } from '../../constants/apiUrl';

const CityPage: FC = () => {
	const dispatch = useAppDispatch();
	const { addCities } = citySlice.actions;
	const { id } = useParams();
	const { cities } = useAppSelector(state => state.city);
	const city = cities.find(el => el.id === Number(id));

	const { data, isLoading, fulfilledTimeStamp } =
		weatherApi.useFetchWeatherQuery({
			lat: city?.lat,
			lon: city?.lon,
		});

	const { date, time } = useDate(fulfilledTimeStamp);

	const hourlyToday = data?.hourly.filter(
		(item, idx) => idx % 2 === 0 && idx < 24
	);

	const range = {
		max: Math.max.apply(
			Math,
			hourlyToday?.map(e => e.temp)
		),
		min: Math.min.apply(
			Math,
			hourlyToday?.map(e => e.temp)
		),
	};

	useEffect(() => {
		dispatch(
			addCities(JSON.parse(localStorage.getItem('cities') || '[]') as ICity[])
		);
	}, []);

	return (
		<Box>
			<Typography variant='h3' component='h1' gutterBottom align='center'>
				{city?.name}, {city?.state}, {city?.country}
			</Typography>
			{isLoading ? (
				<Box>
					<Skeleton width='60%' />
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</Box>
			) : (
				<Grid container spacing={2}>
					<Grid item md={6}>
						<Typography>
							Feels like {Math.floor(data?.current.feels_like)}°C.{', '}
							{data?.current.weather[0].description}
						</Typography>
						<List sx={{ display: 'flex', flexWrap: 'wrap' }}>
							<ListItem dense disablePadding sx={{ width: '50%' }}>
								<ListItemText
									primary={
										<NavigationIcon
											sx={{
												fontSize: '1rem',
												lineHeight: 1,
												transform: `rotate(${data?.current.wind_deg}deg)`,
												mr: 0.5,
											}}
										/>
									}
									secondary={` ${data?.current.wind_speed}m/s`}
								/>
							</ListItem>
							<ListItem dense disablePadding sx={{ width: '50%' }}>
								<ListItemText secondary={`${data?.current.pressure}hPa`} />
							</ListItem>
							<ListItem dense disablePadding sx={{ width: '50%' }}>
								<ListItemText
									secondary={`Humidity: ${data?.current.humidity}`}
								/>
							</ListItem>
							<ListItem dense disablePadding sx={{ width: '50%' }}>
								<ListItemText
									secondary={`Visibility: ${data?.current.visibility / 1000}km`}
								/>
							</ListItem>
						</List>
					</Grid>
					<Grid item md>
						<Typography variant='body1' sx={{ color: 'warning.main' }}>
							{`${date}, ${time}`}
						</Typography>
						<Typography
							variant='h2'
							sx={{ display: 'flex', flexDirection: 'column' }}
						>
							{Math.floor(data?.current.temp)}°C
						</Typography>
					</Grid>
					<Grid item md>
						{data?.current.weather[0].icon && (
							<img
								alt={data?.current.weather[0].main}
								src={`${apiUrl.IMG_URL}${data?.current.weather[0].icon}@2x.png`}
							/>
						)}
					</Grid>
				</Grid>
			)}

			<Typography variant='h6'>Hourly Forecast</Typography>

			<Grid container>
				{hourlyToday &&
					hourlyToday.map((item, idx) => (
						<HourlyItem
							key={item.dt}
							weather={item}
							index={idx}
							range={range}
						/>
					))}
			</Grid>
		</Box>
	);
};

export default CityPage;
