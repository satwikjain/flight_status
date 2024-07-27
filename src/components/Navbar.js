import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import logo from '../images/image001.png'; // Ensure the path to your logo is correct


const IndigoNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container className="justify-content-center">
        <Navbar.Brand href="/" className="text-center">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Indigo logo"
            style={{ marginRight: '10px' }}
          />
          <span className="navbar-brand-text">Indigo</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default IndigoNavbar;
