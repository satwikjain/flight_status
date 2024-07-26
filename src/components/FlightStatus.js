import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FlightStatus() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('/api/flights')
      .then(response => {
        setFlights(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Flight Status</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight.id}>
            {flight.number}: {flight.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightStatus;
