import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../images/image001.png'; 


const IndigoNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" style={{ marginBottom: '25px' }}>
      <Container>
        <Navbar.Brand href="/" className="text-center justify-content-center">
          <img
            src={logo}
            height="50"
            className="d-inline-block align-top"
            alt="Indigo logo"
            style={{ marginRight: '10px' }}
          />
          <span className="navbar-brand-text">Indigo</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/"><Button variant="outline-primary">Home</Button></Nav.Link>
          <Nav.Link as={Link} to="/admin">
            <Button variant="outline-primary">Admin Panel</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default IndigoNavbar;
