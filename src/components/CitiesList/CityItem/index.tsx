import React, { FC } from 'react';
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Skeleton,
	Tooltip,
	Typography,
} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDate } from '../../../hooks/useDate';
import { ICity } from '../../../types/ICity';
import { weatherApi } from '../../../services/WeatherService';
import { useAppDispatch } from '../../../hooks/redux';
import { citySlice } from '../../../store/reducers/cities/CitySlice';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../../constants/apiUrl';

interface CityItemProps {
	city: ICity;
}

const CityItem: FC<CityItemProps> = ({ city }) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { deleteCity } = citySlice.actions;

	const { id, name, state, country, lon, lat } = city;

	const { data, refetch, isLoading, fulfilledTimeStamp } =
		weatherApi.useFetchShortWeatherQuery({
			lon,
			lat,
		});

	const { date, time } = useDate(fulfilledTimeStamp);

	const handleDelete = () => {
		dispatch(deleteCity(id));
	};

	return (
		<Grid item xs={4}>
			<Card>
				<CardActionArea onClick={() => navigate(`/${name}-${id}`)}>
					<CardHeader
						sx={{
							bgcolor: 'primary.main',
							color: '#fff',
							flexDirection: 'row-reverse',
						}}
						title={
							isLoading ? (
								<>
									<Skeleton />
									<Skeleton width='40%' />
									<Skeleton width='60%' />
								</>
							) : (
								<Typography variant='h6'>{`${name}, ${state}, ${country}`}</Typography>
							)
						}
						subheader={
							<Typography variant='body1' sx={{ color: 'warning.main' }}>
								{`${date}, ${time}`}
							</Typography>
						}
						avatar={
							<Typography
								variant='h5'
								sx={{ display: 'flex', flexDirection: 'column' }}
							>
								{isLoading ? (
									<>
										<Skeleton variant='circular' width={100} height={100} />
										<Skeleton width='40%' />
									</>
								) : (
									<>
										<img
											alt={data?.weather[0].main}
											src={`${apiUrl.IMG_URL}${data?.weather[0].icon}@2x.png`}
										/>
										{Math.floor(data?.main.temp)}°C
									</>
								)}
							</Typography>
						}
					/>
					<CardContent>
						{isLoading ? (
							<Box>
								<Skeleton width='60%' />
								<Skeleton />
								<Skeleton />
								<Skeleton />
							</Box>
						) : (
							<>
								<Typography>
									Feels like {Math.floor(data?.main.feels_like)}°C.{', '}
									{data?.weather[0].description}
								</Typography>
								<List sx={{ display: 'flex', flexWrap: 'wrap' }}>
									<ListItem dense disablePadding sx={{ width: '50%' }}>
										<ListItemText
											primary={
												<NavigationIcon
													sx={{
														fontSize: '1rem',
														lineHeight: 1,
														transform: `rotate(${data?.wind.deg}deg)`,
														mr: 0.5,
													}}
												/>
											}
											secondary={` ${data?.wind.speed}m/s`}
										/>
									</ListItem>
									<ListItem dense disablePadding sx={{ width: '50%' }}>
										<ListItemText secondary={`${data?.main.pressure}hPa`} />
									</ListItem>
									<ListItem dense disablePadding sx={{ width: '50%' }}>
										<ListItemText
											secondary={`Humidity: ${data?.main.humidity}`}
										/>
									</ListItem>
									<ListItem dense disablePadding sx={{ width: '50%' }}>
										<ListItemText
											secondary={`Visibility: ${data?.visibility / 1000}km`}
										/>
									</ListItem>
								</List>
							</>
						)}
					</CardContent>
				</CardActionArea>

				<CardActions sx={{ justifyContent: 'space-between' }}>
					<Tooltip title='Обновить данные о погоде сейчас'>
						<IconButton onClick={() => refetch()}>
							<AutorenewIcon />
						</IconButton>
					</Tooltip>
					<Button variant='outlined' onClick={() => handleDelete()}>
						Delete
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default CityItem;
