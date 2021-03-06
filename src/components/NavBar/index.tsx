import React, { FC, useCallback } from 'react';

import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import SearchCity from '../SearchCity';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateClick = useCallback(() => {
    navigate('/');
  }, []);

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='open drawer'
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h5'
                component='span'
                sx={{ cursor: 'pointer' }}
                onClick={handleNavigateClick}
              >
                Weather
              </Typography>
              <Box sx={{ ml: 2 }}></Box>
              <Button
                onClick={handleNavigateClick}
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                Home
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {location.pathname === '/' && <SearchCity />}
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
