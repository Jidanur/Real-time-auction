import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Theme from './MyTheme';
import NavBar from './NavBar';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { MAX_CHARACTERS } from '../myConfig.js';
const MAX_TITLE = MAX_CHARACTERS.MAX_TITLE;
const MAX_DESCRIPTION = MAX_CHARACTERS.MAX_DESCRIPTION;
const MAX_DATE = MAX_CHARACTERS.MAX_DATE;
const COOKIE_USER_ID_KEY=MAX_CHARACTERS.COOKIE_USER_ID_KEY;


export const CreateAuction = () => {
  const [formAuction, setFormAuction] = useState({
    title: '',
    user: '',

    description: '',

    startPrice: '',
    images: [],

    startDate: '',
    startTime: '',

    endDate: '',
    endTime: '',

  });


  const [maxReached, setMaxReached] = useState({
    title: false,
    description: false,

    startPrice: false,

    startDate: false,
    startTime: false,

    endDate: false,
    endTime: false


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

    let currentDate = `${year}-${month}-${day}`;
    // if (!start && formAuction.startDate > currentDate)
    //   currentDate = formAuction.startDate


    return currentDate;
  };

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    // Append leading zero if month, day, hours, minutes, or seconds is single digit
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    // if (seconds < 10) {
    //   seconds = '0' + seconds;
    // }

    // console.log("Current before: ");
    // console.log(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    // console.log("Start date " + formAuction.startDate);
    // console.log("comaprision equal? ");
    // console.log(formAuction.startDate === getCurrentDate(true));


    let currentDateTime = `${hours}:${minutes}`;
    // if ((start & formAuction.startDate === getCurrentDate(true)) || (!start && formAuction.endDate === getCurrentDate(false))) {
    //   currentDateTime = `${hours}:${minutes}:${seconds}`;
    //   console.log("Its today");
    // }

    // else if ((start && formAuction.startDate > getCurrentDate(true)) || (!start && formAuction.endDate > getCurrentDate(false))) {
    //   currentDateTime = `00:00:00`;
    //   console.log("bigger than today");
    // }
    // if (!start && formAuction.startDate===formAuction.endDate)
    // {
    //   currentDateTime=formAuction.startTime
    //   console.log("it's end time")
    // }

    // console.log("Current:" + currentDateTime);
    // console.log("User " + formAuction.startDate + " " + formAuction.startTime + " -> " + formAuction.endDate + " " + formAuction.endTime);

    return currentDateTime;
  };

  const [fieldDisabled, setFieldDisabled] = useState({
    startDate: false,
    startTime: true,
    endDate: true,
    endTime: true,
  });

  const [validated, setValidated] = useState({
    startDate: false,
    startTime: true,
    endDate: true,
    endTime: true,


  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    setFormAuction({ ...formAuction, images: files }); // Update images state with selected files
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log("MAX TITLE " +MAX_CHARACTERS.MAX_TITLE);

    // Define maximum lengths for each field
    const maxLengths = {
      title: MAX_TITLE,
      date: MAX_DATE,
      description: MAX_DESCRIPTION // Adjust as needed
    };

    event.target.maxLength = maxLengths[name];

    // if (name==='images')
    // {
    //  console.log("just save images in  the form");
    //  console.log(value);
    // }

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

      if (name === 'startDate') {



        setFieldDisabled({
          startDate: true,
          startTime: false,
          endDate: true,
          endTime: true,
        });
      } else if (name === 'startTime') {
        if (formAuction.startDate === getCurrentDate() & (value < getCurrentDateTime())) {
          setValidated({
            startDate: true,
            startTime: false,
            endDate: true,
            endTime: true,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: false,
            endDate: true,
            endTime: true,
          });
        }
        else {
          setValidated({
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: true,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: true,
            endDate: false,
            endTime: true,
          });
        }
      }
      else if (name === 'endDate') {
        if (formAuction.startDate > value) {
          setValidated({
            startDate: true,
            startTime: true,
            endDate: false,
            endTime: true,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: true,
            endDate: false,
            endTime: true,
          });
        }
        else {
          setValidated({
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: true,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: false,
          });
        }





      }
      else if (name === 'endTime') {
        if (formAuction.startDate === formAuction.endDate && formAuction.startTime >= formAuction.endTime) {
          setValidated({
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: false,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: false,
          });
        }
        else {
          setValidated({
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: true,
          })
          setFieldDisabled({
            ...fieldDisabled,
            startDate: true,
            startTime: true,
            endDate: true,
            endTime: true,
          });
        }

      }
};


const handleResetFields = () => {
  setFormAuction({
    ...formAuction,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });
  setFieldDisabled({
    startDate: false,
    startTime: true,
    endDate: true,
    endTime: true,
  });
};


const handleCreate = (event) => {
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
   // setValidated(true);

  }
}

const postAuction = async () => {
  console.log("Posting a new auction");
  console.log("button was cliked.");
  const isAuthenticated = !!Cookies.get(COOKIE_USER_ID_KEY);
  if (!isAuthenticated) {
    // If user is not authenticated, show an alert and then redirect to login page
    alert('Session expiered. You need to login to create new auction.');
    navigate('/login');
    //return null;
  }
  else{

  let auctioner_id=parseInt(Cookies.get(COOKIE_USER_ID_KEY));
  console.log("the use id get from cookie "+ auctioner_id);
  try {
    const responseAuction = await fetch('http://127.0.0.1:8080/auction/createauction', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sellerID:auctioner_id,
        winnerID:2,
        auctionTitle: formAuction.title,
        auctionDescription: formAuction.description,
       // imageName:
       initialPrice:formAuction.startPrice,
      
       startTime:`${formAuction.startDate}T${formAuction.startTime}`,
       endTime:`${formAuction.endDate}T${formAuction.endTime}`,

      }),
    });

    if (!responseAuction.ok) {
      throw new Error(`HTTP error! status: ${responseAuction.status}`);
    }
    else{

    const data = await responseAuction.json();
    console.log('Added auction nSuccess:', data);
    //alert("Auction added, thanks");
    //window.location.assign("/");
   // window.location.href = '/';
    }

    // Reset the form or navigate the user to a success page, etc.
  } catch (error) {
    console.error('There was an error with the form submission:', error);
  }

  try {
  const formData = new FormData();
  for (const file of formAuction.images) {
    formData.append('images', file);
  }
  //formData.append('images', formAuction.images);

  const responseImage = await fetch('http://127.0.0.1:8080/auction/upload-images', { 
    method: 'POST',
   body:formData
  });

    if (!responseImage.ok) {
      throw new Error(`Upload iamge: HTTP error! status: ${responseImage.status}`);
    }
    else{

    const data = await responseImage.json();
    console.log('Image updload Success:', data);
   alert("Auction created, thanks");
   navigate('/');
    //window.location.assign("/");
   // window.location.href = '/';
    }

    // Reset the form or navigate the user to a success page, etc.
  } catch (error) {
    console.error('There was an error with the form submission:', error);
  }
}
};

const [showAlert, setShowAlert] = useState(true);
const navigate = useNavigate();

const isAuthenticated = !!Cookies.get(COOKIE_USER_ID_KEY);
const handleAlertClose = () => {
  setShowAlert(false); // Hide the alert
  navigate('/login');
};

if (!isAuthenticated && showAlert) {
  // If user is not authenticated and the alert is shown, display the alert
  return (
    <div>
      <h1 style={{ fontSize: '24px', color: 'red' }}>You need to login to access this page.</h1>
      <button onClick={() => handleAlertClose()}>Close</button>
    </div>
  );
}



return (
  <div style={{ backgroundColor: Theme.palette.primary.dark_orange }}>
    <NavBar />{/* Including the NavBar at the top */}
    <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
      <Form onSubmit={handleCreate}>
        <Typography variant="h4" gutterBottom>
          {formAuction.title ? formAuction.title : "New Auction"}
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

        <Form.Group controlId="images" className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" multiple 
          name='images'
          required
        //  value={formAuction.images}
          onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
            Please provide some pictures of the item.
          </Form.Control.Feedback>


        <Row>

          <Col lg={10}>
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
                    disabled={fieldDisabled.startDate}
                  />
                  {maxReached.date && <small className="text-danger">Maximum {MAX_DATE} characters reached</small>}
                  {/* {validated.startDate && <small className="text-danger">Maximum {MAX_DATE} characters reached</small>} */}
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
                    //   min={getCurrentDateTime()}
                    disabled={fieldDisabled.startTime}

                  />
                  {!validated.startTime &&!fieldDisabled.startTime && <small className="text-danger">Start time cannot be in the past</small>}
                  <Form.Control.Feedback type="invalid">
                    Please provide the time auction will start.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>


            <Row>
              <Col>
                <Form.Group controlId="end-date" className="mb-3">
                  <Form.Label>End date (required)</Form.Label>
                  <Form.Control type="date"
                    required
                    name="endDate"

                    value={formAuction.endDate}
                    onChange={handleChange}
                    disabled={fieldDisabled.endDate}
                    min={getCurrentDate()} />
                </Form.Group>
                {maxReached.date && <small className="text-danger">Maximum {MAX_DATE} characters reached</small>}
                {!validated.endDate && !fieldDisabled.endDate && <small className="text-danger">End date cannot be before start date</small>}
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
                    onChange={handleChange}
                    disabled={fieldDisabled.endTime}
                  //  min={getCurrentDateTime()}
                  />
                </Form.Group>
                {!validated.endTime && !fieldDisabled.endTime && <small className="text-danger">End time cannot be before start time.</small>}
                <Form.Control.Feedback type="invalid">
                  Please provide the time auction will end.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Col>


          <Col sm={1}>

            <Button onClick={handleResetFields} className="btn-sm" 
            style={{fontSize:'12px'
            ,display: 'flex',
             backgroundColor: Theme.palette.primary.light_orange,    
              borderRadius: '20px',border:'black', 
              boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'}}>Reset Date and time</Button>

          </Col>


        </Row>
        <div style={{ display: 'flex', justifyContent: "center" }}>
          <Button variant="primary" type="submit" style={{fontSize:'25px', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'black', display: 'flex', backgroundColor: Theme.palette.secondary.light_green }} >
            <b>Submit</b>
          </Button>

        </div>
      </Form>
    </Container>
  </div >
);
}


//export default CreateAuction;

export default CreateAuction;