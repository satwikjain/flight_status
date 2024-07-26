import React from 'react';
import { Button, Card } from 'react-bootstrap';

const FlightItem = ({ flight, onStatusChange }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{flight.airline} flight {flight.flight_number}</Card.Title>
        <Card.Text>
          From {flight.departure.airport} ({flight.departure.iata}) to {flight.arrival.airport} ({flight.arrival.iata})<br/>
          Status: <strong>{flight.status}</strong><br/>
          Gate: {flight.gate}
        </Card.Text>
        <Button variant="warning" onClick={() => onStatusChange(flight.id, 'delayed')}>Delay</Button>{' '}
        <Button variant="danger" onClick={() => onStatusChange(flight.id, 'cancelled')}>Cancel</Button>{' '}
        <Button variant="success" onClick={() => onStatusChange(flight.id, 'scheduled')}>Schedule</Button>
      </Card.Body>
    </Card>
  );
};

export default FlightItem;
