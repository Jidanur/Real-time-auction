import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function AuctionList({  }) {
  const [cardData, setCardData] = useState([]);


  useEffect(() => {
    const preLoad = async () => {
      try {
        const responseAuction = await fetch('http://127.0.0.1:8080/auction/all', {
          method: 'GET',
        });

        if (!responseAuction.ok) {
          throw new Error(`HTTP error! status: ${responseAuction.status}`);
        }

        const data = await responseAuction.json();
        setCardData(data);
        console.log('get auction list success:', data);
      } catch (error) {
        console.error('List all auctions: There was an error with the form submission:', error);
      }
    };

    preLoad();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts


    return (
        <Row xs={1} md={2} lg={4} className="g-4"  >

          {cardData.map((card, idx) => (
           // console.log("card "+idx+" : +card.auctionTitle);
            <Col key={idx}>
              <Card>
                {/* <Card.Img
                 variant="top" 
                 //src={card.auction} 
                 alt={card.auctionTitle}
                style={{ maxWidth: '100%', maxHeight: '150px' }}  /> */}
                <Card.Body>
                  <Card.Title>{card.auctionTitle}</Card.Title>
                  <Card.Text>{card.auctionDescription}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    
  }
  
  export default AuctionList;