import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AuctionCard from './Card';
import car from '../images/car.png';
import book from '../images/book.jpg';
import pokemon_cards from '../images/pokemon-cards.jpeg';


function AuctionList({ cardData }) {
    return (
        <Row xs={1} md={2} lg={4} className="g-4">
          {cardData.map((card, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img
                 variant="top" 
                 src={card.imageSrc} 
                 alt={card.title}
                style={{ maxWidth: '100%', maxHeight: '150px' }}  />
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    
  }
  
  export default AuctionList;