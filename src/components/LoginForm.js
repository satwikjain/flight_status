// LoginForm.js
import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (userId === 'admin' && password === 'password') { // Replace with actual authentication logic
      onLoginSuccess();
    } else {
      setErrorMessage('Invalid user ID or password');
    }
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <Modal show={true} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID"
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
          <Button variant="secondary" onClick={handleCancel} className="mt-3">Cancel</Button>
          <Button variant="primary" onClick={handleLogin} className="mt-3 ms-2">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginForm;
