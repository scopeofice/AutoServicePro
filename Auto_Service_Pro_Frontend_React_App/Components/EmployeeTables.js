import React from 'react';
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import { useState } from 'react';

const EmployeeTables = () => {

  const [bookings, setBookings] = useState([
    { id: 1, date: '2023-08-22', bookingStatus: 'Confirmed', paymentStatus: 'Paid' },
    { id: 2, date: '2023-08-25', bookingStatus: 'Pending', paymentStatus: 'Unpaid' },
    // ... more booking objects
  ]);

  const handleCompleteBooking = (bookingId) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, bookingStatus: 'Completed' };
      }
      return booking;
    });
    setBookings(updatedBookings);
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
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>{booking.paymentStatus}</td>
                  <td>
                    {booking.bookingStatus !== 'Completed' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCompleteBooking(booking.id)}
                      >
                        Done
                      </Button>
                    )}
                    {booking.bookingStatus === 'Completed' && (
                      <span>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default EmployeeTables;
