import React, { FC } from 'react';
import { List, Paper } from '@mui/material';

import SearchCityItem from '../SearchCityItem';
import { ICity } from '../../../types/ICity';

interface SearchCityListProps {
	citySearchResult: ICity[];
	handleAddCity: (city: ICity) => void;
}

const SearchCityList: FC<SearchCityListProps> = ({
	citySearchResult,
	handleAddCity,
}) => {
	return (
		<>
			{!!citySearchResult.length && (
				<Paper
					sx={{
						color: 'text.primary',
						position: 'absolute',
						top: '100%',
						width: '100%',
						zIndex: 10,
					}}
				>
					<List>
						{citySearchResult.map((city, index) => (
							<SearchCityItem
								key={index}
								city={city}
								handleAddCity={handleAddCity}
							/>
						))}
					</List>
				</Paper>
			)}
		</>
	);
};

export default SearchCityList;
