import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightList from './components/FlightList';
import IndigoNavbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights');
      setFlights(response.data);

      // Log attendants details for each flight
      response.data.forEach(flight => {
        console.log(`Flight ID: ${flight.flight_id}, Airline: ${flight.airline}`);
        flight.attendants.forEach((attendant, index) => {
          console.log(`Attendant ${index + 1}: Email - ${attendant.email}, Phone - ${attendant.phone}`);
        });
      });
    } catch (error) {
      console.error('Error fetching flight data', error);
    }
  };

  const handleStatusChange = async (flight_id, newStatus) => {
    try {
      await axios.put(`/api/flights/${flight_id}`, { status: newStatus });
      fetchFlights(); 
    } catch (error) {
      console.error('Error updating flight status', error);
    }
  };

  return (
    <Router>
      <Container>
        <IndigoNavbar />
        <div style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={
              <Container className="flight-list-container">
                <FlightList flights={flights} onStatusChange={handleStatusChange} />
              </Container>
            } />
            <Route path="/admin" element={
              <AdminPanel flights={flights} onStatusChange={handleStatusChange} />
            } />
          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;
