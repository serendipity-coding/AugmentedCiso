import { createTheme } from '@mui/material/styles';

export const minRiskTheme = createTheme({
  palette: {
    primary: {
      main: '#2C5263'
    },
    secondary: {
      main: '#F2B847'
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.54)',
      secondary: '#EF0B0B',
      disabled: '#757575'
    },
    action: {
      disabledBackground: '#fff'
    }
  },
  action: { disabled: 'white', disabledBackground: '#C7C7C7' },
  typography: {
    fontFamily: 'Roboto, Arial, Helvetica',
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 900,
    button: {
      textTransform: 'none',
      borderRadius: '10px',
      fontSize: '.9rem',
      letterSpacing: '0rem',
      padding: '.25rem'
    }
  }
});
