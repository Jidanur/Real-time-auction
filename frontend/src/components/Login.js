import { Typography } from '@mui/material';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import Theme from './MyTheme';
import NavBar from './NavBar';

function Login() {
  return (
    <div>
      <NavBar />{/* Including the NavBar at the top */}
      <Container style={{ marginTop: '20px', marginLeft:'20px' }}>
    <Form>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
      <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type="email" placeholder="name@example.com" required  />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control type="password" placeholder="Password"
          required />
        </Col>
      </Form.Group>    
      <div style={{display:'flex',justifyContent: "center"}}>
      <Button variant="primary" type="submit"  style={{color:'black',boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', display:'flex', backgroundColor: Theme.palette.secondary.light_green }} >
               <b>Submit</b>
          
              </Button>

      </div>
    </Form>
</Container>
    </div>
  );
}

export default Login;