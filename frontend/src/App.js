import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS




import HomePage from './pages/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import CreateAuction from './components/CreateAuction';
import BidderViewAuction from './components/BidAuction';

import bike from '../src/images/bike.jpg';

import car from '../src/images/car.jpg';
import house from '../src/images/house.jpg';
import nintendo from '../src/images/nintendo.jpg';
import pokemon_cards from '../src/images/pokemon-cards.jpeg';
import ps5 from '../src/images/ps5.png';
//const images = ['../src/images/bike.jpg','../src/images/car.jpg', '../src/images/house.jpg'];
const images=[bike, car, house, ps5, pokemon_cards, nintendo];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/create-auction" element={<CreateAuction/>} />
        <Route path="/auction" element={<BidderViewAuction images={images}/>} />

        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
