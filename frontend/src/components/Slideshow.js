import Carousel from 'react-bootstrap/Carousel';
import pokemon_cards from '../images/bike.jpg';
import car from '../images/car.jpg';
import book from '../images/nintendo.jpg';

function Slideshow() {


  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item >
        <img
         fluid="true"
          className="d-block w-100"
          src={car}
          alt="First slide"
          style={{ maxWidth: '700px', maxHeight: '300px', margin: 'auto' }}
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item >
        <img
          className="d-block w-100"
          src={book}
          alt="Second slide"
          style={{ maxWidth: '700px', maxHeight: '300px', margin: 'auto' }}
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
        fluid
          className="d-block w-100"
          src={pokemon_cards}
          alt="Third slide"
          style={{ maxWidth: '700px', maxHeight: '300px', margin: 'auto' }}
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slideshow;