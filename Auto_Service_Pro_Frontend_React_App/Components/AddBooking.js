import React, { useState } from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import BookServiceSVG from '../img/booking.svg';

const AddBooking = ({user}) => {
  
  const nav=useNavigate();
  
  const handleBooking=()=>{
    nav("/BookService", {state : {user : user}});
  }

  return (
    <MDBRow className="mb-4">
      <MDBCol>
        <MDBCard>
          <MDBCardBody className="d-flex align-items-center justify-content-between">
            <div>
              <img src={BookServiceSVG} alt="Book Service" width="40" height="40" />
            </div>
            <div>
              <Button variant="success" onClick={handleBooking}>Book Service</Button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default AddBooking;
