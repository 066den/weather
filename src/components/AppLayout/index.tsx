import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, ReactElement } from 'react';
import NavBar from '../NavBar';

interface AppLayoutProps {
  children: ReactElement;
}

const BOX_SX = { minHeight: '100vh' };

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <Box sx={BOX_SX}>
      <NavBar />
      <Container>
        <Box pt={5} pb={5}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default AppLayout;
