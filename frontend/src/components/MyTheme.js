// theme.js

import { createTheme } from '@mui/material/styles';

// Define custom theme with orange and brownish colors
const Theme = createTheme({
  palette: {
    primary: {
      main: '#a10707', // Orange color
      child2: '#f89d00',
      child1: '#ffffff',
      child3: '#eaaa5c',
    },
    secondary: {
      main: '#25f741', // Brownish color
    },
  },
});

export default Theme;
