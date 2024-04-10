import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Carousel from 'react-bootstrap/Carousel';

import Container from 'react-bootstrap/Container';

import Cookies from 'js-cookie';
import ListGroup from 'react-bootstrap/ListGroup';

import { useNavigate, useParams } from 'react-router-dom';

import Theme from './MyTheme';
import NavBar from './NavBar';



import { MAX_CHARACTERS } from '../myConfig.js';
const COOKIE_USER_ID_KEY = MAX_CHARACTERS.COOKIE_USER_ID_KEY;

function BidderViewAuction() {
    const { auctionID } = useParams();
    const [auctionData, setAuctionData] = useState({
        id: '',
        title: '',
        auctioner: '',

        description: '',

        startPrice: '',
        images: [],
        currentPrice: '',

        startDate: '',
        startTime: '',

        endDate: '',
        endTime: '',
    });
    const [timeLeft, setTimeLeft] = useState('');



    const [formBid, setFormBid] = useState({
        bid_price: '',
        auction_id: '',
        date_time: '',
    });

    const list = [
        { date: 'Mar 27, 2024 (12:25 AM)', name: 'Luis', amount: 25 },
        { date: 'Mar 27, 2024 (12:19 AM)', name: 'Ivy', amount: 20 },
        { date: 'Mar 27, 2024 (12:19 AM)', name: 'Ivy', amount: 11 },

        // Add more items as needed
    ];


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

    useEffect(() => {
        const fetchAuctionData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/auction/getauction/${auctionID}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                else {

                    const data = await response.json();
                    const { date: startDate, time: startTime } = splitDateTime(data.startTime);
                    const { date: endDate, time: endTime } = splitDateTime(data.endTime);
                    // setAuctionData({
                    //     id: data.auctionID,
                    //     title: data.auctionTitle,
                    //     acutioner: data.sellerID,

                    //     description: data.auctionDescription,

                    //     startPrice: data.initialPrice,
                    //     // images: [],

                    //     startDate: startDate,
                    //     startTime: startTime,

                    //     endDate: endDate,
                    //     endTime: endTime,

                    //     currentPrice: data.currentBid === 0 ? data.initialPrice : data.currentBid,

                    // });
                    try{
                        const responseSellerInfo = await fetch(`http://127.0.0.1:8080/user/getuser/${data.sellerID}`,
                        {
                            method: 'GET',
                        });
                        if (responseSellerInfo.ok)
                        {
    
                            const sellerInfo=await responseSellerInfo.json();
                            console.log("Reposne: ", sellerInfo);
                         
                            console.log("Fetch username succeed.");
                            setAuctionData(
                                {
                                    ...auctionData,
                                    auctioner:sellerInfo.userName,
                                }
                            )
                        }
                    }
                        catch(error)
                        {
                            console.error('There was an error with the get username form submission:', error);
                            alert("There is something wrong with the request. Please clear all cookies and try again. Thanks!");
                        }

    
    


console.log("auctionID ", data.auctionID);
                    const responseImages = await fetch(`http://127.0.0.1:8080/auction/get-images/${data.auctionID}`, {
                        method: 'GET',
                    });
    
                    if (!responseImages.ok) {
                        throw new Error(`HTTP error! status: ${responseImages.status}`);
                    }
                    else{
                        
                        const dataImages = await responseImages.json();
                        console.log("The images received are ", dataImages);
     



                    setAuctionData({
                        id: data.auctionID,
                        title: data.auctionTitle,
                        acutioner: data.sellerID,

                        description: data.auctionDescription,

                        startPrice: data.initialPrice,
                        images:dataImages,

                        startDate: startDate,
                        startTime: startTime,

                        endDate: endDate,
                        endTime: endTime,

                        currentPrice: data.currentBid==null || data.currentBid === 0 ? data.initialPrice : data.currentBid,

                    });

                    console.log("what is saved in teh auctiondb image is ", auctionData.images);
                }

                    console.log("Image loaded.", auctionData);
                }
            }
            catch (error) {
                console.error('Error fetching auction data:', error);
            }
        };

        fetchAuctionData();
    }, [auctionID]);


    const endDate = auctionData.endDate;
    const endTime = auctionData.endTime;

    //     const calculateTimeLeft = () => {
    //         const now = new Date();
    //         const endDateTime = new Date(`${endDate} ${endTime}`);

    //         const difference = endDateTime - now;
    //         if (difference <=0) {
    //             setTimeLeft('Expired');
    //             return;
    //         }

    //         const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    //         const minutes = Math.floor((difference / 1000 / 60) % 60);
    //         const seconds = Math.floor((difference / 1000) % 60);

    //         setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    //     };

    //     const interval = setInterval(calculateTimeLeft, 10000);

    //     return () => clearInterval(interval);

    // }, [endDate, endTime]);

    const handleSubmitBid = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            // window.location.href = '/';
            postSubmitBid(formBid.bid_price);
            // setValidated(true);

        }
    }


    const navigate = useNavigate();

    const postSubmitBid = async (bid) => {
        console.log("Submit a bid");
        console.log("button was cliked.");
        const isAuthenticated = !!Cookies.get(COOKIE_USER_ID_KEY);
        if (!isAuthenticated) {
            // If user is not authenticated, show an alert and then redirect to login page
            alert('Session expiered. You need to login to bid.');
            navigate('/login');
            //return null;
        }
        else {


            let bidder_id = parseInt(Cookies.get(COOKIE_USER_ID_KEY));
            try {
                const response = await fetch('http://127.0.0.1:8080/bid/placebid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        auctionID: auctionData.id,
                        bidderID: bidder_id,

                        bidPrice: bid,
                        timeOfBid: formBid.date_time
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                else {


                    //const data = await response.json();
                    //console.log('Success:', data);
                    alert("Bid submitted, thanks");


                }

                // Reset the form or navigate the user to a success page, etc.
            } catch (error) {
                console.error('There was an error with the form submission:', error);
            }
        }
    };



    if (!auctionData) {
        return <div>Get some drink, I am still loading...</div>;
    }
    else

        return (
            <div style={{ backgroundColor: Theme.palette.primary.white }}>

                <NavBar />{/* Including the NavBar at the top */}
                <Row>
                    <Col>
                        <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
                            <Form onSubmit={handleSubmitBid}>
                                <Typography variant="h4" gutterBottom>
                                    {auctionData.title}
                                </Typography>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>   Auction Title    </Form.Label>
                                    <Form.Control
                                        disabled
                                        type="text"
                                        value={auctionData.title}

                                    //placeholder="Auction title"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="auctioner">
                                    <Form.Label>Auctioner</Form.Label>
                                    <Form.Control
                                        disabled
                                        //type="text"
                                        value={auctionData.auctioner}

                                    // placeholder="Auctioner info"
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        disabled
                                        rows={6}
                                        name="description"
                                        value={auctionData.description}
                                        // value={formData.description}
                                        //onChange={handleChange}
                                        style={{ resize: 'vertical' }}
                                    />


                                    <Form.Control.Feedback type="invalid">
                                        Please provide a description.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div style={{ marginBottom: '20px' }}>
                                    {auctionData.images.length === 0 ? (
                                        <p>No images available</p>
                                    ) : (
                                        <Form.Group as={Carousel} className="mb-3" controlId="auction-images" style={{ width: 'auto', maxHeight: '200px', margin: 'auto' }}>

                                            {auctionData.images.map((image, index) => (
                                                <Carousel.Item key={index} disabled>
                                                    <img
                                                        className="d-block w-10"
                                                        //src={image}//{`data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`}//{URL.createObjectURL(image)}
                                                        src={`data:image/jpeg;base64,${image}`}
                                                        alt={`Slide ${index}`}
                                                        style={{ maxWidth: '700px', maxHeight: '200px', margin: 'auto' }}
                                                    />
                                                </Carousel.Item>
                                            ))}

                                        </Form.Group>
                                     )} 
                                </div>


                                <Form.Label>Current Price</Form.Label>
                                <InputGroup className="mb-3">

                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        disabled
                                        step="1"
                                        value={auctionData.currentPrice}
                                        aria-label="Amount (to the nearest dollar)" />
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>


                                <Form.Label>Your bid</Form.Label>
                                <InputGroup className="mb-3">

                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        required
                                        type="number"
                                        placeholder='Your bid'
                                        step="1"
                                        style={{ backgroundColor: Theme.palette.primary.light_orange }}

                                        aria-label="Amount (to the nearest dollar)" />
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                                <div style={{ display: 'flex', justifyContent: "center" }}>
                                    <Button variant="primary" type="submit"

                                        style={{
                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                            color: 'black', display: 'flex',
                                            backgroundColor: Theme.palette.secondary.light_green
                                        }}
                                        value={formBid.bid_price}
                                    //onClick={() => handleSubmitBid()}
                                    >
                                        <b>Confirm</b>
                                    </Button>
                                </div>


{/* //Timeleft  */}
                                {/* <Form.Group className="mb-3" controlId="time_left">
                                    <Form.Label style={{ textAlign: 'center' }}>Time Left </Form.Label>
                                    <Form.Control //
                                        //type='hour:minutes'
                                        // value={timeLeft}
                                        disabled
                                    />
                                </Form.Group> */}
                                <br>
                                </br>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="start-date" className="mb-3">
                                            <Form.Label>Start date</Form.Label>
                                            <Form.Control //type="date" 
                                                value={auctionData.startDate}
                                                disabled />
                                        </Form.Group>

                                    </Col>
                                    <Col>
                                        <Form.Group controlId="start-time" className="mb-3">
                                            <Form.Label>Start time</Form.Label>
                                            <Form.Control
                                                //type="time" 
                                                value={auctionData.startTime}

                                                disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group controlId="endt-date" className="mb-3">
                                            <Form.Label>End date</Form.Label>
                                            <Form.Control //type="date" 

                                                value={auctionData.endDate}
                                                disabled />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="end-time" className="mb-3">
                                            <Form.Label>End time</Form.Label>
                                            <Form.Control
                                                // type="time"
                                                value={auctionData.endTime}
                                                disabled />
                                        </Form.Group>
                                    </Col>
                                </Row>


                            </Form>
                        </Container>

                    </Col>

                    <Col sx lg="5"
                    >
                        <br>

                        </br>
                        <h5>Top {list.length} recent bids:</h5>
                        <ListGroup>
                            <Container style={{ backgroundColor: Theme.palette.primary.light_orange }}>
                                {list.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col>{item.date}</Col>
                                            <Col>{item.name}</Col>
                                            <Col>${item.amount}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </Container>
                        </ListGroup>

                    </Col>

                </Row>
            </div>
        );


}
export default BidderViewAuction;