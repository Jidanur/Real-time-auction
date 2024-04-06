import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Carousel from 'react-bootstrap/Carousel';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure'

import ListGroup from 'react-bootstrap/ListGroup';

import Theme from './MyTheme';
import NavBar from './NavBar';


import bike from '../images/bike.jpg';
var MAX_DESCRIPTION = 5000;

function BidderViewAuction({ images }) {
    // console.log(data);

    // data.forEach(image =>
    // {
    //     console.log(image);
    // });
    return (
        <div style={{ backgroundColor: Theme.palette.primary.child3 }}>

            <NavBar />{/* Including the NavBar at the top */}
            <Row>
                <Col>
                    <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
                        <Form>
                            <Typography variant="h4" gutterBottom>
                                View auction to bid
                            </Typography>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Auction title</Form.Label>
                                <Form.Control
                                    disabled
                                    type="text"

                                    placeholder="Auction title"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Auctioner</Form.Label>
                                <Form.Control
                                    disabled
                                    type="text"

                                    placeholder="Auctioner info"
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    disabled
                                    rows={6}
                                    name="description"
                                    placeholder="Detailed Item Description"
                                    // value={formData.description}
                                    //onChange={handleChange}
                                    style={{ resize: 'vertical' }}
                                />


                                <Form.Control.Feedback type="invalid">
                                    Please provide a description.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <div style={{ marginBottom: '20px' }}>
                                <Form.Group as={Carousel} className="mb-3" controlId="auction-images" style={{ width: 'auto', maxHeight: '200px', margin: 'auto' }}>

                                    {images.map((image, index) => (
                                        <Carousel.Item key={index} disabled>
                                            <img
                                                className="d-block w-10"
                                                src={image}
                                                //  alt={`Slide ${index}`}
                                                style={{ maxWidth: '700px', maxHeight: '200px', margin: 'auto' }}
                                            />


                                        </Carousel.Item>
                                    ))}

                                </Form.Group>
                            </div>


                            <Form.Label>Current Price</Form.Label>
                            <InputGroup className="mb-3">

                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    disabled
                                    step="1"

                                    aria-label="Amount (to the nearest dollar)" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            <Form.Label>Your bid</Form.Label>
                            <InputGroup className="mb-3">

                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder='Your bid'
                                    step="1"

                                    aria-label="Amount (to the nearest dollar)" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <Button variant="primary" type="submit" style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', color: 'black', display: 'flex', backgroundColor: Theme.palette.secondary.main }} >
                                    <b>Confirm</b>
                                </Button>
                            </div>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label style={{ textAlign: 'center' }}>Time Left </Form.Label>
                                <Form.Control type='hour:minutes'
                                    disabled
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="start-date" className="mb-3">
                                        <Form.Label>Start date</Form.Label>
                                        <Form.Control type="date" disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="start-time" className="mb-3">
                                        <Form.Label>Start time</Form.Label>
                                        <Form.Control type="time" disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="endt-date" className="mb-3">
                                        <Form.Label>End date</Form.Label>
                                        <Form.Control type="date" disabled />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="end-time" className="mb-3">
                                        <Form.Label>End time</Form.Label>
                                        <Form.Control type="time"
                                            disabled />
                                    </Form.Group>
                                </Col>
                            </Row>


                        </Form>
                    </Container>

                </Col>

                <Col sx lg="5">
                    <h5>Bidding history:</h5>
                    <ListGroup>
                        <ListGroup.Item><Row> 
                            <Col>Mar 27, 2024 (12:21 AM) </Col>
                             <Col> Cras justo odi bgkjjgugigikh </Col>
                            <Col>$
                                34
                            </Col>
                        </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

            </Row>
        </div>
    );


}
export default BidderViewAuction;