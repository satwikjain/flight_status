import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightList from './components/FlightList';
import IndigoNavbar from './components/Navbar';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebase';
import './App.css'; // Ensure this import is correct

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
      fetchFlights();
    } catch (error) {
      console.error('Error updating flight status', error);
    }
  };

  return (
    <Container>
      <IndigoNavbar />
      <Container className="flight-list-container">
        <FlightList flights={flights} onStatusChange={handleStatusChange} />
      </Container>
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
  );
}

export default App;
