import React from 'react';
import { Button, Card } from 'react-bootstrap';

const FlightItem = ({ flight, onStatusChange }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{flight.airline} flight {flight.flight_id}</Card.Title>
        <Card.Text>
          Departure: {new Date(flight.scheduled_departure).toLocaleString()} at gate {flight.departure_gate}<br/>
          Arrival: {new Date(flight.scheduled_arrival).toLocaleString()} at gate {flight.arrival_gate}<br/>
          Status: <strong>{flight.status}</strong>
        </Card.Text>
        <Button variant="warning" onClick={() => onStatusChange(flight.flight_id, 'Delayed')}>Delay</Button>{' '}
        <Button variant="danger" onClick={() => onStatusChange(flight.flight_id, 'Cancelled')}>Cancel</Button>{' '}
        <Button variant="success" onClick={() => onStatusChange(flight.flight_id, 'On Time')}>On Time</Button>
      </Card.Body>
    </Card>
  );
};

export default FlightItem;
