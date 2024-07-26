import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';
import { Container } from 'react-bootstrap';

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/flights/${id}`, { status: newStatus });
      fetchFlights();
    } catch (error) {
      console.error('Error updating flight status', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Flight Status and Notifications</h1>
      <FlightList flights={flights} onStatusChange={handleStatusChange} />
    </Container>
  );
}

export default App;
