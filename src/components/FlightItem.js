import React from 'react';
import { Card } from 'react-bootstrap'; 

const FlightItem = ({ flight }) => {
  // Determine the background color based on the flight status
  const getStatusClass = (status) => {
    switch (status) {
      case 'On Time':
        return 'status-on-time';
      case 'Delayed':
        return 'status-delayed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <Card className={`mb-3 ${getStatusClass(flight.status)}`}>
      <Card.Body>
        <Card.Title>{flight.airline} flight {flight.flight_id}</Card.Title>
        <Card.Text>
          Departure: {new Date(flight.scheduled_departure).toLocaleString()} at gate {flight.departure_gate}<br />
          Arrival: {new Date(flight.scheduled_arrival).toLocaleString()} at gate {flight.arrival_gate}<br />
          Status: <strong>{flight.status}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FlightItem;
