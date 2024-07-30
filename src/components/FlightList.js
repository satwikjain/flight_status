import React, { useState } from 'react';
import FlightItem from './FlightItem';
import { Container, Row, Col, Form } from 'react-bootstrap';

const FlightList = ({ flights, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Sort flights by scheduled departure time
  const sortedFlights = flights.sort((a, b) => new Date(a.scheduled_departure) - new Date(b.scheduled_departure));

  // Filter flights based on search term and status
  const filteredFlights = sortedFlights.filter(flight => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      flight.airline.toLowerCase().includes(lowerSearchTerm) ||
      flight.flight_id.toLowerCase().includes(lowerSearchTerm) ||
      flight.departure_gate.toLowerCase().includes(lowerSearchTerm) ||
      flight.arrival_gate.toLowerCase().includes(lowerSearchTerm)
    ) && (filterStatus === '' || flight.status === filterStatus);
  });

  return (
    <Container>
      <Form className="mb-3" >
        <Form.Group as={Row} controlId="formSearch">
          <Form.Label column sm={2}>Search</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Search by airline, flight number, or gate"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formFilter">
          <Form.Label column sm={2}>Filter by Status</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="On Time">On Time</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
      {filteredFlights.map(flight => (
        <Row key={flight.flight_id} className="flight-row">
          <Col>
            <FlightItem flight={flight} onStatusChange={onStatusChange} />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default FlightList;
