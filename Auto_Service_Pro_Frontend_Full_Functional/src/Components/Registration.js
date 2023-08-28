import React from 'react';
import {
  
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
}
from 'mdb-react-ui-kit';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import backgroundImage from '../img/register.jpg';
import { useState } from 'react';
import axios from 'axios';

import { Link,useNavigate } from 'react-router-dom';


export default function Singnup() {

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const role="CUSTOMER";
  const nav = useNavigate();


  const handleSignup = async () => {  
    if(confirmPassword===password){
      try {
        const response = await axios.post("http://localhost:8080/register", {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          role,
        });
        if (response.status === 201) {
          // alert("Registration successful! You can now log in.");
          nav("/Login");
        } 
      } catch (error) {
        console.error("Registration error", error);
      }
    
    }
    else{
      console.error("Password didn't match.")
    }
  }
  


  return (

    <MDBContainer fluid style={backgroundStyle}>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">Please enter your details!</p>

              <Form>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          First Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="First Name" value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Last Name
                        </Form.Label>
                        <Form.Control type="text" placeholder="Last Name" value={lastName}
                      onChange={(e) => setLastName(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Phone number
                        </Form.Label>
                        <Form.Control type="text" placeholder="Phone number" value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group><br/>
                      <div className="d-grid">
                        <Button variant="primary" type="button" onClick={handleSignup}>
                          Create Account
                        </Button>
                      </div>
                    </Form>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      Already have an account??{" "}
                        <Link to={"/Login"} className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </MDBContainer>
  );
}

