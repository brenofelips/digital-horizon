import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8257e6',
    },
    background: {
      default: '#121214',
      paper: '#202024',
    },
    text: {
      primary: '#e1e1e6',
      secondary: '#a8a8b3',
    },
  },
  typography: {
    h4: {
      color: '#e1e1e6',
    },
    body1: {
      color: '#e1e1e6',
    },
  },
});

export default theme;
