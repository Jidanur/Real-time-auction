import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

import Car from '../images/car.png';
import { MAX_CHARACTERS } from '../myConfig.js';
import './css/clickable-card.css';

const COOKIE_USER_ID_KEY=MAX_CHARACTERS.COOKIE_USER_ID_KEY;
const MAX_DESCRIPTION_IN_CARD=MAX_CHARACTERS.MAX_DESCRIPTION_IN_CARD;


function AuctionList() {
  const [cardData, setCardData] = useState([]);
  
  const navigate = useNavigate();


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
        data['image']=Car;
        setCardData(data);
        console.log('get auction list success:', data);
      } catch (error) {
        console.error('List all auctions: There was an error with the form submission:', error);
      }
    };

    preLoad();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts


  const splitDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const option_date = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',

    };

    const option_time = {

        hour: '2-digit',
        minute: '2-digit',


    };

    // Splitting Date
    const date = dateTime.toLocaleDateString('en-CA', option_date);
    const format = dateTime.toLocaleTimeString('en-CA', option_time);


    // Splitting Time
    const hour = dateTime.getHours() + 5;

    const minute = dateTime.getMinutes();
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12

    const time = `${formattedHour < 10 ? '0' : ''}${formattedHour}:${minute < 10 ? '0' : ''}${minute} ${meridiem}`;

    return { date, time };
}

const formatDateTime = (dateTimeString) => {
  const {date, time} = splitDateTime(dateTimeString);
  // Format the date and time as desired
  return `${date} ${time}`;
}

  const [showAlert, setShowAlert] = useState(true);

  const handleCardClick=(auctionID)=>{
   console.log("the id shoudl be : " +auctionID);
    //window.location.href= move to the page that laod the auction view


    // const isAuthenticated = !!Cookies.get(COOKIE_USER_ID_KEY);
    // const handleAlertClose = () => {
    //   setShowAlert(false); // Hide the alert
    //   navigate('/login');
    // };
    
    // if (!isAuthenticated && showAlert) {
    //   // If user is not authenticated and the alert is shown, display the alert
    //   return (
    //     <div>
    //       <h1 style={{ fontSize: '24px', color: 'red' }}>You need to login to access this page.</h1>
    //       <button onClick={() => handleAlertClose()}>Close</button>
    //     </div>
    //   );
    // }

    navigate(`/auction/${auctionID}`); 
  }

    return (
        <Row xs={1} md={2} lg={4} className="g-4"  >

          {cardData.map((card, idx) => (
           // console.log("card "+idx+" : +card.auctionTitle);
            <Col key={idx}>
              <Card  
              style={{ maxwidth: '18rem' , height:'18rem'}}
              className="clickable-card" 
          onClick={() => handleCardClick(card.auctionID)}
           >
                {/* <Card.Img
                 variant="top" 
                //  src={card.image} 
                 alt={card.auctionTitle}
                style={{ maxWidth: '100%', maxHeight: '150px' }}  /> */}
                <Card.Body>
                  <Card.Title style={{fontSize:'28px'}}>{card.auctionTitle}</Card.Title>
                  <Card.Text style={{fontSize:'13px'}}>End time: {formatDateTime(card.endTime)}</Card.Text>
                  <Card.Text>          {card.auctionDescription.length > MAX_DESCRIPTION_IN_CARD // Change 100 to your desired length
                  ? `${card.auctionDescription.substring(0, MAX_DESCRIPTION_IN_CARD)}...`
                  : card.auctionDescription}
              </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    
  }
  
  export default AuctionList;