import { Button } from '@mui/material';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Theme from './MyTheme';
// FilterBar component
const FilterBar = () => {
  return (
    <div style={{ width: '200px', height: '100vh', backgroundColor: Theme.palette.primary.white, padding: '10px', position: 'fixed', left: 0, top: '80px' }}>
      <Button
        variant="primary"
        style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', textTransform: 'none', marginLeft: '0px', marginTop: '5px', padding: '10px', background: Theme.palette.secondary.light_green }}
        component={Link}
        to="/create-auction"
      >
        <b>Create An Auction</b>
      </Button>{' '}
      <div 
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

      </div>
    </div>

  );
}

export default FilterBar;
