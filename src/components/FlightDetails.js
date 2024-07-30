import React from 'react';
import { Alert } from 'react-bootstrap';

const FlightDetails = ({ flight }) => {
  const getStatusMessage = (status) => {
    if (status === 'Cancelled') {
        return (
          <Alert variant="danger">
            We are sorry for the inconvenience. The flight has been cancelled.
          </Alert>
        );
      } else if (status === 'Delayed') {
        return (
          <Alert variant="warning">
            We are sorry for the inconvenience. The flight has been delayed.
          </Alert>
        );
      }
    return null;
  };

  const calculateDuration = (departure, arrival) => {
    const departureDate = new Date(departure);
    const arrivalDate = new Date(arrival);
    const durationMs = arrivalDate - departureDate;
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${durationHours}h ${durationMinutes}m`;
  };

  return (
    <div>
      {getStatusMessage(flight.status)}
      <p><strong>Departure:</strong> {new Date(flight.scheduled_departure).toLocaleString()}</p>
      <p><strong>Departure Gate:</strong> {flight.departure_gate}</p>
      <p><strong>Arrival:</strong> {new Date(flight.scheduled_arrival).toLocaleString()}</p>
      <p><strong>Arrival Gate:</strong> {flight.arrival_gate}</p>
      <p><strong>Status:</strong> {flight.status}</p>
      <p><strong>Flight Duration:</strong> {calculateDuration(flight.scheduled_departure, flight.scheduled_arrival)}</p>
    </div>
  );
};

export default FlightDetails;
