import React, { FC } from 'react';
import { Grid, Paper, Box } from '@mui/material';

import { ICurrentWeather } from '../../types/IWeather';

interface IRange {
  min: number;
  max: number;
}
interface HourlyItemProps {
  weather: ICurrentWeather;
  index: number;
  range: IRange;
}

const BOX_SX = { height: 100, my: '15px', position: 'relative' };

const HourlyItem: FC<HourlyItemProps> = props => {
  const {
    weather: { temp },
    range: { min, max },
  } = props;

  const indent = Math.floor(((temp - min) * 100) / (max - min));

  return (
    <Grid item xs={1}>
      <Grid container direction='column' alignItems='center'>
        <Box>{props.index * 2}&deg;&deg;</Box>
        <Box sx={BOX_SX}>
          <Paper
            sx={{
              px: 1,
              bgcolor: 'warning.light',
              position: 'absolute',
              transform: 'translate(-50%,50%)',
              bottom: `${indent}%`,
            }}
          >
            {Math.floor(temp)}°C
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HourlyItem;
