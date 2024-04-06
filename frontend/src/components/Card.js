import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AuctionCard(card) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../images/car.png" />
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>
            {card.description}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default AuctionCard;