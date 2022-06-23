import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

const CityPage: FC = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { cities } = useAppSelector(state => state.city);
	const city = cities.find(el => el.id === Number(id));

	useEffect(() => {
		if (!city) navigate('/');
	}, []);
	return <div>CityPage</div>;
};

export default CityPage;
