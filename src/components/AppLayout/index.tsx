import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, ReactElement } from 'react';
import NavBar from '../NavBar';

interface AppLayoutProps {
	children: ReactElement;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	return (
		<Box sx={{ minHeight: '100vh' }}>
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
