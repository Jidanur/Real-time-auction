import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom'; // If you're using React Router
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material';

import Theme from './MyTheme';


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: '8px',
    transition: theme.transitions.create('width'),
    backgroundColor: Theme.palette.primary.child1, 
    borderRadius: '20px',
    width: '100%',
  },
}));

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ background: `linear-gradient(to right, ${Theme.palette.primary.main}, ${Theme.palette.primary.child2})` }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
          Auction
        </Typography>
        <StyledInputBase
          placeholder="Search..."
          
          inputProps={{ 'aria-label': 'search' }}
          sx={{ marginLeft: '10px' }}
        />
                 <Button color="inherit" component={Link} to="/search">
          <SearchIcon />
        </Button>
         </div>


        <div>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About us</Button>
        <Button color="inherit" component={Link} to="/contact">Account</Button>
      
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
