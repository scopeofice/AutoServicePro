import React from 'react';
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import axios from 'axios';

const EmployeeTables = () => {

  const [bookings, setBookings] = useState([]);
  var i = 1;

  useEffect(() => {
    // Fetch bookings from API
    fetch('http://localhost:8080/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, [bookings]);

  const handleCompleteBooking = async (book) => {
    try {
      const response = await axios.put(`http://localhost:8080/bookings`, {
        ...book,
        status: 'COMPLETED'
      });

      // if (response.status === 200) {
        console.log("Updated")
        
      // }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

 


  return (
    <>
      <Tabs defaultActiveKey="bookings" id="bookings" className="mb-3" fill>
        <Tab eventKey="bookings" title="Bookings">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Booking Date</th>
                <th>Booking Status</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.bookingId}>
                  <td>{i++}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.status}</td>
                  <td>{booking.paymentStatus}</td>
                  <td>
                    {booking.status !== 'COMPLETED' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCompleteBooking(booking)}
                      >
                        Done
                      </Button>
                    )}
                    {booking.status === 'COMPLETED' && (
                      <span>COMPLETED</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          Phone number: 8319997419
          Email : shubhamg0615@gmail.comment
          GitHub : scopeofice
        </Tab>
      </Tabs>
    </>
  );
};

export default EmployeeTables;
