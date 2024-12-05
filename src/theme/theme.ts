import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
      primary: {
        main: '#0f2634',
        contrastText: 'rgba(255,255,255,0.87)',
      },
      secondary: {
        main: '#2faf7e',
        contrastText: 'rgba(255,255,255,0.87)',
      },
      background: {
        default: '#E0E4EA',
      },
      text: {
        primary: '#052025',
        secondary: '#757F8A',
        disabled: '#E3E6E8',
      },
      error: {
        main: '#FF6861',
        contrastText: 'rgba(255,255,255,0.87)',
      },
      warning: {
        main: '#ffd14e',
      },
      info: {
        main: '#4983F4',
      },
      success: {
        main: '#27bd75',
      },
      divider: '#C8CCD0',
    },
  typography: {
    fontFamily: 'Mulish',
    fontWeightLight: 300,
    button: {
      fontFamily: "Source Sans 3",
      fontSize: '0.8rem',
      letterSpacing: '0.02857em',
    },
    body2: {
      fontWeight: 300,
    },
  },
});

export default theme;