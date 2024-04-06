import { Typography } from '@mui/material';
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from 'react';

import Theme from './MyTheme';
import NavBar from './NavBar';




const MAX_TITLE = 20;
const MAX_DESCRIPTION = 10;

const MAX_DATE = 12;




export const CreateAuction=() =>{
  const [formAuction, setFormAuction] = useState({
    title: '',
    user:'',

    description: '',

    startPrice:'',
    iamges:'',

    startDate: '',
    startTime:'',

    endDate:'',
    endTime:'',

  });

  const [maxReached, setMaxReached] = useState({
    title: false,
    description: false,
  
    startPrice:false,
  
    startDate: false,
    startTime: false,
  
    endDate: false,
    endTime:false
  
  
  })

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Append leading zero if month or day is single digit
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };


  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Define maximum lengths for each field
    const maxLengths = {
      title: MAX_TITLE,
      date: MAX_DATE,
      description: MAX_DESCRIPTION // Adjust as needed
    };

    event.target.maxLength = maxLengths[name];


    // Update the form data with the truncated value
    setFormAuction({
      ...formAuction,
      [name]: value//truncatedValue
    });

    if (value.length >= maxLengths[name]) {
      setMaxReached({
        ...maxReached,
        [name]: true
      });
    } else {
      setMaxReached({
        ...maxReached,
        [name]: false
      });
    }
  };


  const handleCreate=(event)=>{
    event.preventDefault();
    const form = event.currentTarget;
  
    // if (!isEmailDomainValid) {
    //   alert("Please use a valid @myumanitoba.ca or @umanitoba.ca email address.");
    //   return;
    // }
  
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
     // window.location.href = '/';
      postAuction();
      setValidated(true);


    }

  }

  const postAuction = async () => {
    console.log("Posting a new auction");
    try {
      const response = await fetch('http://127.0.0.1:5000/create-auction', { // Make sure this matches your Flask endpoint for lost items
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formAuction.title,
          user: formAuction.user,
          description: formAuction.description,

          iamges:formAuction.iamges,

          startPrice:formAuction.startPrice,

          startDate: formAuction.startDate, // Make sure this key matches what your backend expects
          startTime: formAuction.startTime, 
          endDate: formAuction.endDate, 
          endTime: formAuction.endTime, 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      alert("Auction added, thanks");
      //window.location.assign("/");
      window.location.href = '/';

      // Reset the form or navigate the user to a success page, etc.
    } catch (error) {
      console.error('There was an error with the form submission:', error);
    }
  };

  return (
    <div style={{ backgroundColor: Theme.palette.primary.child3 }}>
      <NavBar />{/* Including the NavBar at the top */}
      <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
        <Form onSubmit={handleCreate}>
          <Typography variant="h4" gutterBottom>
            New Auction
          </Typography>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Auction title (requried, {MAX_TITLE} characters max) </Form.Label>
            <Form.Control
              type="text"
              required
              name='title'
              placeholder="Auction title"
              value={formAuction.title}
              onChange={handleChange}
            />
   
          {maxReached.title && <small className="text-danger">Maximum {MAX_TITLE} characters reached</small>}
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
                </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description (required, {MAX_DESCRIPTION} characters max)</Form.Label>
            <Form.Control
              as="textarea"
              required
              rows={6}
              name="description"
              placeholder="Detailed Item Description"
              value={formAuction.description}
              onChange={handleChange}
              style={{ resize: 'vertical' }}
            />
                {maxReached.description && <small className="text-danger">Maximum {MAX_DESCRIPTION} characters reached</small>}

            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Label>Starting price (required, non negative integer number)</Form.Label>
          <InputGroup className="mb-3">

            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              name='startPrice'
              required
              step="1"
              placeholder='Starting price'
              value={formAuction.startPrice}
              onChange={handleChange}
              aria-label="Amount (to the nearest dollar)" />
            <InputGroup.Text>.00</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
                  Please provide a price.
                </Form.Control.Feedback>
          </InputGroup>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="start-date" className="mb-3">
                <Form.Label>Start date (required)</Form.Label>
                <Form.Control 
                type="date" 
                name="startDate"
                required
                value={formAuction.startDate}
                onChange={handleChange}
                min={getCurrentDate()}
                />
                {maxReached.date && <small className="text-danger">Maximum {MAX_DATE} characters reached</small>}
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Group controlId="start-time" className="mb-3">
                <Form.Label>Start time (required)</Form.Label>
                <Form.Control 
                type="time" 
                required
                name="startTime"
                value={formAuction.startTime}
                onChange={handleChange}

          
                />
                  <Form.Control.Feedback type="invalid">
                  Please provide the time auction will start.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="endt-date" className="mb-3">
                <Form.Label>End date (required)</Form.Label>
                <Form.Control type="date" 
                required
                name="endDate"
       
                value={formAuction.endDate}
                onChange={handleChange}
                min={getCurrentDate()}/>
              </Form.Group>
              {maxReached.date && <small className="text-danger">Maximum {MAX_DATE} characters reached</small>}
              <Form.Control.Feedback type="invalid">
                  Please provide a valid date for the auction end.
                </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Group controlId="end-time" className="mb-3">
                <Form.Label>End time (required)</Form.Label>
                <Form.Control type="time" 
                required
                name="endTime"
                value={formAuction.endTime}
                onChange={handleChange}/>
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                  Please provide the time auction will end.
                </Form.Control.Feedback>
            </Col>
          </Row>

          <div style={{ display: 'flex', justifyContent: "center" }}>
            <Button variant="primary" type="submit" style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'black', display: 'flex', backgroundColor: Theme.palette.secondary.main }} >
              <b>Submit</b>
            </Button>

          </div>
        </Form>
      </Container>
    </div>
  );
}

//export default CreateAuction;

export default CreateAuction;