import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';
import FlightDetails from './FlightDetails'; // Import the new FlightDetails component

const FlightItem = ({ flight }) => {
  const [showModal, setShowModal] = useState(false);

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
    <>
      <Card 
        className={`mb-3 ${getStatusClass(flight.status)} flight-item`} 
        onClick={() => setShowModal(true)} 
        style={{ cursor: 'pointer' }}
      >
        <Card.Body>
          <Card.Title>{flight.airline} flight {flight.flight_id}</Card.Title>
          <Card.Text>
            Departure: {new Date(flight.scheduled_departure).toLocaleString()} at gate {flight.departure_gate}<br />
            Arrival: {new Date(flight.scheduled_arrival).toLocaleString()} at gate {flight.arrival_gate}<br />
            Status: <strong>{flight.status}</strong>
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{flight.airline} flight {flight.flight_id} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlightDetails flight={flight} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FlightItem;
