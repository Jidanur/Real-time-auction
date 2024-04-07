// theme.js

import { createTheme } from '@mui/material/styles';

// Define custom theme with orange and brownish colors
const Theme = createTheme({
  palette: {
    primary: {
      'main':'#1ea107',
      'red' :'#a10707', // Orange color
      'light_orange': '#f4af36',
      'white': '#ffffff',
      'dark_orange': '#db9d52',
    },
    secondary: {
      'main':'#db9c4e',
      'light_green': '#25f741', // Brownish color
    },
  },
});

export default Theme;
