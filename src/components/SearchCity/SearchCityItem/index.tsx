import React, { FC, useCallback } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

import { apiUrl } from '../../../constants/apiUrl';
import { ICity } from '../../../types/ICity';

interface SearchCityItemProps {
  city: ICity;
  handleAddCity: (city: ICity) => void;
}

const SearchCityItem: FC<SearchCityItemProps> = ({ city, handleAddCity }) => {
  const { name, lat, lon, country, state } = city;

  const handleClick = useCallback(() => {
    handleAddCity({ ...city, id: Date.now() });
  }, []);

  return (
    <ListItem dense>
      <ListItemButton onClick={handleClick}>
        <ListItemText
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          primary={
            <>
              {`${name}, ${state}, ${country} `}
              <img
                alt={country}
                src={`${apiUrl.FLAG_API_URL}${country.toLowerCase()}.png`}
              />
            </>
          }
          secondary={`${lat.toFixed(3)}, ${lon.toFixed(3)}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SearchCityItem;
