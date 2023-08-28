import { Container, Form, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function Header() {
  // const [data, setData] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // useEffect(() => {
  //   const apiUrl = `http://localhost:8080/search/service/${searchQuery}`;

  //   axios.get(apiUrl)
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [searchQuery]);

  const element = (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="">
          AutoServicePro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="">
              Home
            </Nav.Link>
            
            <Nav.Link href="#service">Services</Nav.Link>
            <Nav.Link as={Link} to="/AboutUs">
              About Us
            </Nav.Link>
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              className="me-2"
              style={{ backgroundColor: 'rgb(0,0,0)', color: 'white' }}
              aria-label="Search"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
            {data.length > 0 && (
              <ul>
                {data.map(service => (
                  <li key={service.id}>{service.name}</li>
                ))}
              </ul>
            )} */}

            {/* <Button variant="outline-success">Search</Button> */}
          {/* </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  return element;
}
