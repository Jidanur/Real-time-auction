import React from 'react';
import AuctionList from '../components/AuctionList';
import FilterBar from '../components/FilterBar';
import NavBar from '../components/NavBar';
import Slideshow from '../components/Slideshow';

import Theme from '../components/MyTheme';


import bike from '../images/bike.jpg';
import book from '../images/book.jpg';
import car from '../images/car.jpg';
import house from '../images/house.jpg';
import laptop from '../images/laptop.jpg';
import nintendo from '../images/nintendo.jpg';
import pokemon_cards from '../images/pokemon-cards.jpeg';
import ps5 from '../images/ps5.png';
const cardData = [
  {
    imageSrc: ps5,
    title: 'Card 1',
    description: 'Description for Card 2'
  },
  {
    imageSrc: nintendo,
    title: 'Card 2',
    description: 'Description for Card 2'
  },
  {
    imageSrc: book,
    title: 'Card 3',
    description: 'Description for Card 2'
  },

  {
    imageSrc: bike,
    title: 'Card 4',
    description: 'Description for Card 2'
  },
  {
    imageSrc: pokemon_cards,
    title: 'Card 5',
    description: 'Description for Card 2'
  },
  {
    imageSrc: house,
    title: 'Card 6',
    description: 'Description for Card 2'
  },
  {
    imageSrc: car,
    title: 'Card 7 ',
    description: 'Description for Card 2'
  },
  {
    imageSrc: laptop,
    title: 'Card 4',
    description: 'Description for Card 2'
  },
  {
    imageSrc: ps5,
    title: 'Card 4',
    description: 'Description for Card 2'
  },
  {
    imageSrc: nintendo,
    title: 'Card 4',
    description: 'Description for Card 2'
  },
  {
    imageSrc: house,
    title: 'Card 4',
    description: 'Description for Card 2'
  },
  // Add more card objects as needed
];
function HomePage() {
  return (
    <div style={{ backgroundColor: Theme.palette.primary.child3 }}>
      <div style={{ display: 'flex' }}>
        <NavBar />
      </div>


      <div style={{ marginLeft: '220px', flexGrow: 1 }}>

        <FilterBar />



        <div className='main' style={{ marginRight: '5px', padding: '10px' }}>
          <div style={{ marginRight: 0, padding: '10px' }}>
            <Slideshow />
          </div>



          <div className='list'>
            <AuctionList cardData={cardData} />
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
