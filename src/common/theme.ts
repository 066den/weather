import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
	typography: {
		h2: {
			fontWeight: 700,
		},
		h1: {
			fontWeight: 700,
			fontSize: '5rem',
		},
	},
	palette: {
		primary: {
			light: '#6195e3',
			main: '#2468b1',
			dark: '#003e81',
		},
		secondary: {
			light: '#ffff51',
			main: '#FCCF00',
			dark: '#c49e00',
		},
	},
	components: {
		MuiListItemText: {
			styleOverrides: {
				root: {
					display: 'flex',
					alignItems: 'center',
				},
			},
		},
	},
});

export default defaultTheme;
