import React from 'react';
import FlightItem from './FlightItem';
import { Container, Row, Col } from 'react-bootstrap';

const FlightList = ({ flights, onStatusChange }) => {
  return (
    <Container>
      <Row>
        {flights.map(flight => (
          <Col key={flight.flight_id} sm={12} md={6} lg={4}>
            <FlightItem flight={flight} onStatusChange={onStatusChange} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FlightList;
