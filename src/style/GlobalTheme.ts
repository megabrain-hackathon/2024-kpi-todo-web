import { createTheme } from '@mui/material';

const theme = createTheme({
	components: {
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: 'white',
					color: 'black',
				},
			},
		},
	},
});

export default theme;
