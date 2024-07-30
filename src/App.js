import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change here
import FlightList from './components/FlightList';
import IndigoNavbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebase';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [notification, setNotification] = useState({ title: '', body: '' });

  useEffect(() => {
    fetchFlights();

    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        console.log(firebaseToken);
        // Send the token to your server to register the device
      })
      .catch((err) => {
        console.error(err);
      });

    onMessageListener()
      .then((payload) => {
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
      })
      .catch((err) => console.error('failed: ', err));
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('/api/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flight data', error);
    }
  };

  const handleStatusChange = async (flight_id, newStatus) => {
    try {
      await axios.put(`/api/flights/${flight_id}`, { status: newStatus });
      fetchFlights(); // Refresh the flight list
    } catch (error) {
      console.error('Error updating flight status', error);
    }
  };

  return (
    <Router>
      <Container>
        <IndigoNavbar />
        <div style={{ marginTop: '20px' }}>
          <Routes> {/* Note the change here */}
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
        {notification.title ? (
          <ToastContainer position="top-end" className="p-3">
            <Toast onClose={() => setNotification({ title: '', body: '' })} show={true} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">{notification.title}</strong>
              </Toast.Header>
              <Toast.Body>{notification.body}</Toast.Body>
            </Toast>
          </ToastContainer>
        ) : null}
      </Container>
    </Router>
  );
}

export default App;
