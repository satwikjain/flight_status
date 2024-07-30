import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

const AdminPanel = ({ flights, onStatusChange }) => {
  const [selectedFlight, setSelectedFlight] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [updatedFlight, setUpdatedFlight] = useState(null);

  const handleStatusUpdate = async () => {
    if (selectedFlight && newStatus) {
      try {
        await onStatusChange(selectedFlight, newStatus);
        const updatedFlight = flights.find(flight => flight.flight_id === selectedFlight);
        setUpdatedFlight({ ...updatedFlight, status: newStatus });
        setSuccessMessage('Status changed successfully!');
        setNewStatus('');
        setSelectedFlight('');

        // Hide success message and updated flight card after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
          setUpdatedFlight(null);
        }, 5000);
      } catch (error) {
        console.error('Error updating flight status', error);
      }
    }
  };

  const flightDetails = flights.find(flight => flight.flight_id === selectedFlight);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Admin Panel</h2>
      <Row>
        <Col md={6} className="mx-auto">
          <Form>
            <Form.Group as={Row} controlId="formFlightSelect">
              <Form.Label column sm={4}>Select Flight</Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  value={selectedFlight}
                  onChange={(e) => setSelectedFlight(e.target.value)}
                >
                  <option value="">Select a flight</option>
                  {flights.map(flight => (
                    <option key={flight.flight_id} value={flight.flight_id}>
                      {flight.airline} - {flight.flight_id}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            {selectedFlight && flightDetails && (
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>{flightDetails.airline} flight {flightDetails.flight_id}</Card.Title>
                  <Card.Text>
                    <strong>Current Status:</strong> {flightDetails.status}<br />
                    <strong>Departure:</strong> {new Date(flightDetails.scheduled_departure).toLocaleString()}<br />
                    <strong>Arrival:</strong> {new Date(flightDetails.scheduled_arrival).toLocaleString()}<br />
                    <strong>Departure Gate:</strong> {flightDetails.departure_gate}<br />
                    <strong>Arrival Gate:</strong> {flightDetails.arrival_gate}<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
            {updatedFlight && (
              <Card className="mt-4">
                <Card.Body>
                  <Card.Title>{updatedFlight.airline} flight {updatedFlight.flight_id} (Updated)</Card.Title>
                  <Card.Text>
                    <strong>Current Status:</strong> {updatedFlight.status}<br />
                    <strong>Departure:</strong> {new Date(updatedFlight.scheduled_departure).toLocaleString()}<br />
                    <strong>Arrival:</strong> {new Date(updatedFlight.scheduled_arrival).toLocaleString()}<br />
                    <strong>Departure Gate:</strong> {updatedFlight.departure_gate}<br />
                    <strong>Arrival Gate:</strong> {updatedFlight.arrival_gate}<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
            <Form.Group as={Row} controlId="formStatusSelect" className="mt-3">
              <Form.Label column sm={4}>New Status</Form.Label>
              <Col sm={8}>
                <Form.Control
                  as="select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Button variant="primary" onClick={handleStatusUpdate} className="mt-3">Update Status</Button>
          </Form>
          {successMessage && (
            <Alert variant="success" className="mt-4">
              {successMessage}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
