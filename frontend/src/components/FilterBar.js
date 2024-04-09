import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Theme from './MyTheme';
// FilterBar component

import Cookies from 'js-cookie';



import { MAX_CHARACTERS } from '../myConfig.js';

const COOKIE_USER_ID_KEY = MAX_CHARACTERS.COOKIE_USER_ID_KEY;
const FilterBar = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  const handleCreateAuction = () => {
    console.log("button was cliked.");
    const isAuthenticated = !!Cookies.get(COOKIE_USER_ID_KEY);
    if (!isAuthenticated) {
      // If user is not authenticated, show an alert and then redirect to login page
      alert('You need to login to access this page.');
      navigate('/login');
      //return null;
    }
    else {
      console.log("user is logged in already")
      navigate(`/create-auction`);
    }
  }


  return (
    <div style={{ width: '200px', height: '100vh', backgroundColor: Theme.palette.primary.white, padding: '10px', position: 'fixed', left: 0, top: '80px' }}>
      <Button
        variant="primary"
        style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
         textTransform: 'none', marginLeft: '0px', marginTop: '5px',
          padding: '10px', background: Theme.palette.secondary.light_green }}
        onClick={handleCreateAuction}
      >
        <b>Create An Auction</b>
      </Button>

      {/* <div
        style={{ backgroundColor: Theme.palette.primary.red, padding: '10px', position: 'fixed', left: 0, top: '150px' }}>
        <div>
          <h5
            style={{ color: Theme.palette.primary.light_orange }}>  Filter</h5>
        </div>

        <Form>
          <div className="mb-3" style={{ color: Theme.palette.primary.light_orange }} >
            <Form.Check
              type='checkbox'
              id={'filter-auctions'}
              label={`Auctions end in 24hrs`}
            />
          </div>
        </Form>

      </div> */}
    </div>

  );
}

export default FilterBar;
