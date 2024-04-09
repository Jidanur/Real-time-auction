import { Typography } from '@mui/material';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Theme from './MyTheme';
import NavBar from './NavBar';



import { MAX_CHARACTERS } from '../myConfig.js';
const MAX_USERNAME = MAX_CHARACTERS.MAX_USERNAME
const MAX_PASSWORD = MAX_CHARACTERS.MAX_PASSWORD
const MAX_EMAIL = MAX_CHARACTERS.MAX_EMAIL
const COOKIE_USER_ID_KEY=MAX_CHARACTERS.COOKIE_USER_ID_KEY;



function Login() {

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  //const [userID, setUserID] = useState(0);

  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [maxReached, setMaxReached] = useState({
    username: false,
    password: false,
    email: false,
  })


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

    setFormLogin({
      ...formLogin,
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
  const handleLogin = (event) => {
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
      postLogin();
     // setValidated(true);
  
    }
  }

  const navigate=useNavigate();

  const postLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/user/login', {
        method: 'POST',
        // mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          //userName: formLogin.username,
            email: formLogin.email,
          userPassword: formLogin.password
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else{

        try{
            const data = await response.json();
            console.log('Login Success:', data);
            var userID=data['userID'];

            console.log("userID is "+userID);

            const expirationTime = new Date(new Date().getTime() + 6000000);
            Cookies.set(COOKIE_USER_ID_KEY, JSON.stringify(userID), { expires: expirationTime });
            console.log("cookie set");
            navigate('/');
        }
        catch(error)
        {
          console.log("There was an error with getting the login response ", error);
        }
      }


      //window.location.href = '/';
    } catch (error) {
      console.error('There was an error with the form submission:', error);
    }

  }



  return (
    <div>
      <NavBar />{/* Including the NavBar at the top */}
      <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
        <Form onSubmit={handleLogin} >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          <Form.Group as={Row} className="mb-3" controlId="email">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                required
                type="text"
                name="email"
                placeholder="email"
                value={formLogin.email}
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
                value={formLogin.password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>


          <div style={{ display: 'flex', justifyContent: "center" }}>
            <Button 
            variant="primary"
             type="submit"
             style={{ color: 'black', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', backgroundColor: Theme.palette.secondary.light_green }} >
              <b>Login</b>

            </Button>

          </div>


        {/* Add the script for sign up prompt */}
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize:'14px' }}>
          Don't have an account? <Link to="/signup">Signup here</Link>
        </div>
        </Form>
      </Container>
    </div>
  );
}

export default Login;