import { Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Carousel from 'react-bootstrap/Carousel';

import Container from 'react-bootstrap/Container';

import ListGroup from 'react-bootstrap/ListGroup';

import Theme from './MyTheme';
import NavBar from './NavBar';


var MAX_DESCRIPTION = 5000;

function BidderViewAuction({ images }) {
    // console.log(data);

    // data.forEach(image =>
    // {
    //     console.log(image);
    // });
    return (
        <div style={{ backgroundColor: Theme.palette.primary.white }}>

            <NavBar />{/* Including the NavBar at the top */}
            <Row>
                <Col>
                    <Container style={{ marginTop: '20px', marginLeft: '20px' }}>
                        <Form>
                            <Typography variant="h4" gutterBottom>
                             auction title
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
                                    value="A car, or an automobile, is a motor vehicle with wheels. Most definitions of cars state that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people, not cargo.[1][2]

                                    French inventor Nicolas-Joseph Cugnot built the first steam-powered road vehicle in 1769, while French-born Swiss inventor François Isaac de Rivaz designed and constructed the first internal combustion-powered automobile in 1808. The modern car—a practical, marketable automobile for everyday use—was invented in 1886, when German inventor Carl Benz patented his Benz Patent-Motorwagen. Commercial cars became widely available during the 20th century. One of the first cars affordable by the masses was the 1908 Model T, an American car manufactured by the Ford Motor Company. Cars were rapidly adopted in the US, where they replaced horse-drawn carriages.[3] In Europe and other parts of the world, demand for automobiles did not increase until after World War II.[4] The car is considered an essential part of the developed economy.
                                    
                                    Cars have controls for driving, parking, passenger comfort, and a variety of lamps. Over the decades, additional features and controls have been added to vehicles, making them progressively more complex. These include rear-reversing cameras, air conditioning, navigation systems, and in-car entertainment. Most cars in use in the early 2020s are propelled by an internal combustion engine, fueled by the combustion of fossil fuels. Electric cars, which were invented early in the history of the car, became commercially available in the 2000s and are predicted to cost less to buy than petrol-driven cars before 2025.[5][6] The transition from fossil fuel-powered cars to electric cars features prominently in most climate change mitigation scenarios,[7] such as Project Drawdown's 100 actionable solutions for climate change."
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
                                                  alt={`Slide ${index}`}
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
                                    style={{ backgroundColor: Theme.palette.primary.light_orange }}

                                    aria-label="Amount (to the nearest dollar)" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            <div style={{ display: 'flex', justifyContent: "center" }}>
                                <Button variant="primary" type="submit" 
                                style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
                                color: 'black', display: 'flex',
                                 backgroundColor: Theme.palette.secondary.light_green }} >
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

                <Col sx lg="5"
               >
                    <br>
    
                    </br>
                    <h5>Top 10 recently bids:</h5>
                   
                    <ListGroup >
                    <Container style={{ backgroundColor: Theme.palette.primary.light_orange }}>
                        <ListGroup.Item>
                            <Row > 
                            <Col>Mar 27, 2024 (12:25 AM) </Col>
                             <Col> Luis</Col>
                            <Col>$
                                25
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row > 
                            <Col>Mar 27, 2024 (12:19 AM) </Col>
                             <Col> Ivy</Col>
                            <Col>$
                                20
                            </Col>
                        </Row>
                        </ListGroup.Item>
                        </Container>
                    </ListGroup>
                
                </Col>

            </Row>
        </div>
    );


}
export default BidderViewAuction;