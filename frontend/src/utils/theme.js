import { createTheme } from '@mui/material/styles';

/**
 * Jerusalem Employment Authority Custom Theme.
 * Primary: Jerusalem Blue (Professional & Trustworthy).
 * Secondary: Jerusalem Gold (Authority & Heritage).
 */
const theme = createTheme({
  direction: 'rtl', // Essential for Hebrew interface
  palette: {
    primary: {
      main: '#003399', // The deep blue from the photo
      light: '#335cb2',
      dark: '#00236b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B8860B', // Metallic Gold/Bronze
      contrastText: '#ffffff',
    },
    background: {
      default: '#f4f6f8', // Light grey background like modern gov sites
    },
  },
  typography: {
    fontFamily: '"Assistant", "Heebo", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    button: { textTransform: 'none' }, // Keeps Hebrew text natural
  },
});

export default theme;