import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';



import { MAX_CHARACTERS } from '../myConfig.js';
import Theme from './MyTheme';
import NavBar from './NavBar';
const COOKIE_USER_ID_KEY = MAX_CHARACTERS.COOKIE_USER_ID_KEY;


const AccountPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({
        userName:'',
        email:'',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userID = Cookies.get(COOKIE_USER_ID_KEY);
        if (userID) {
            setIsLoggedIn(true);
            const fetchUsername = async () => {
               
                try{
                    const response = await fetch(`http://127.0.0.1:8080/user/getuser/${userID}`,
                    {
                        method: 'GET',
                    });
                    if (response.ok)
                    {

                        const data=await response.json();
                        console.log("Reposne: ", data);
                     
                        console.log("Fetch username succeed.");
                        setUser(
                            {
                               userName:data.userName,
                               email:data.email,
                            }); 

                    }
                    else{
                        console.log("something is wrong with the fetching username", response.status);
                    }

                    
                }
                catch(error)
                {
                    console.error('There was an error with the get username form submission:', error);
                    alert("There is something wrong with the request. Please clear all cookies and try again. Thanks!");
                }
            }
            fetchUsername();
            console.log("username is stored as ", user.userName);
            // Assuming userID is the username for simplicity
        } else {
            setIsLoggedIn(false);
            setUser(
                {
                    userName:'',
                    emai:'',
                });
        }
    }, []);

    const handleLogin = () => {
        navigate('../login');
        // // Simulate login process
        // Cookies.set('auction-userID', 'exampleUser', { expires: 7 }); // Set cookie with expiration
        // setIsLoggedIn(true);
        // setUsername('exampleUser'); // Set username as an example
    };

    const handleSignup = () => {
        // Redirect to signup page or display a signup modal
        // alert('Redirect to signup page or display signup modal');
        navigate('../signup');
    };

    const handleLogout = () => {
        // Simulate logout process
        alert("Logout succeed. Thanks!");
        Cookies.remove(COOKIE_USER_ID_KEY);
        setIsLoggedIn(false);
        setUser(
            {
                userName:'',
                emai:'',
            });
    };

    return (
        <div style={{ backgroundColor: Theme.palette.primary.dark_orange }}>
            <NavBar />
            <Card className="mt-5" style={{
                backgroundColor: Theme.palette.primary.dark_orange
            }}>
                <Card.Body  >
                    <Card.Title className="d-flex justify-content-center"
                        style={{ fontSize: "40px" }}

                    >Account Information</Card.Title>
                    {isLoggedIn ? (
                        <>
                            <Card.Text className="d-flex justify-content-center"
                                style={{ fontSize: "25px" }}>Your username: {user.userName}</Card.Text>
                            <Card.Text className="d-flex justify-content-center"
                                style={{ fontSize: "25px" }}>Your email: {user.email}!</Card.Text>
                            <br>

                            </br>
                            <div className="d-flex justify-content-center">
                                <Button className="d-flex justify-content-center"

                                    style={{


                                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                        color: 'black', display: 'flex',
                                        backgroundColor: Theme.palette.primary.light_orange
                                    }}
                                    variant="primary" onClick={handleLogout}
                                >Logout</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <br>
                            </br>
                            <Card.Text className="d-flex justify-content-center"
                                style={{ fontSize: "30px" }}
                            >Please login or sign up to access your account.</Card.Text>
                            <div className="d-flex justify-content-center">
                                <Row>
                                <Col>
                                    <Button className="mr-40" variant="primary"

                                        style={{
                                           // fontSize: '25px',


                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                            color: 'black', display: 'flex',
                                            backgroundColor: Theme.palette.secondary.light_green
                                        }}

                                        onClick={handleLogin}>Login</Button>

                                </Col>
                                <Col>
                                    <Button variant="secondary"
                                                                          style={{
                                                                            //fontSize: '25px',
                                
                                
                                                                            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                                                                            color: 'black', display: 'flex',
                                                                            backgroundColor: Theme.palette.primary.light_orange
                                                                        }}
                                        onClick={handleSignup}>Signup</Button>
                                </Col>
                                </Row>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default AccountPage;
