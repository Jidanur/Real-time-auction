import { Typography } from '@mui/material';
import Form from 'react-bootstrap/Form';

import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


import Theme from './MyTheme';
import NavBar from './NavBar';

import { MAX_CHARACTERS } from '../myConfig.js';
const MAX_USERNAME = MAX_CHARACTERS.MAX_USERNAME
const MAX_PASSWORD = MAX_CHARACTERS.MAX_PASSWORD
const MAX_EMAIL = MAX_CHARACTERS.MAX_EMAIL
const SALT_ROUNDS = 10//number of calculation to produce hash password

function Signup() {
  const [formSignup, setFormSignup] = useState({
    username: '',
    password: '',
    email: '',
  })

  const navigate=useNavigate();

  const [maxReached, setMaxReached] = useState({
    username: false,
    password: false,
    email: false,
  })
  const [validated, setValidated] = useState(false);



  const handleChange = (e) => {

    // console.log("MAx username ")
    // console.log(MAX_CHARACTERS.MAX_EMAIL)
    const { name, value } = e.target;



    const max_lengths = {
      username: MAX_USERNAME,
      password: MAX_PASSWORD,
      email: MAX_EMAIL
    }
    e.target.max_length = max_lengths[name];

    setFormSignup({
      ...formSignup,
      [name]: value
    });


    if (value.length >= max_lengths[name]) {
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

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      //window.location.href = '/redirected-page';
      signup();
    }
    setValidated(true);
  };

  const signup = async () => {

    try {
      const response = await fetch('http://127.0.0.1:8080/user/createuser', {
        method:'POST',
       // mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          userName: formSignup.username,
          email: formSignup.email,
          userPassword: formSignup.password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else
      {

      //const data = await response.json();
      //console.log('Success:', data);
      alert("Signup suceed. Please login.Thanks");
      navigate('/login');
      }


      // Reset the form or navigate the user to a success page, etc.
      // window.location.href = '/';
    } catch (error) {
      console.error('There was an error with the form submission:', error);
    }
  };


  return (
    <div>
      <NavBar />{/* Including the NavBar at the top */}
      <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
        <Form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>

          <Form.Group as={Row} className="mb-3" controlId="username">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="username"
                value={formSignup.username}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>


          <Form.Group as={Row} className="mb-3" controlId="email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formSignup.email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="password">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={formSignup.password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: "center" }}>
            <Button variant="primary" type="submit" style={{ color: 'black', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', backgroundColor: Theme.palette.secondary.light_green }} >
              <b>Signup</b>
            </Button>

          </div>


          <div style={{ textAlign: 'center', marginTop: '10px', fontSize:'14px' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
        </Form>
      </Container>
  


    </div>

    
  );
}

export default Signup;