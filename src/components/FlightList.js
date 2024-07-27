import React from 'react';
import FlightItem from './FlightItem';
import { Container, Row, Col } from 'react-bootstrap';

const FlightList = ({ flights }) => {
  // Sort flights by scheduled departure time
  const sortedFlights = flights.sort((a, b) => new Date(a.scheduled_departure) - new Date(b.scheduled_departure));

  return (
    <Container>
      <Row>
        {sortedFlights.map(flight => (
          <Col key={flight.flight_id} sm={12} md={6} lg={4}>
            <FlightItem flight={flight} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FlightList;
