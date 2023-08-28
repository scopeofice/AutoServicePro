import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const BookingDetailsModal = ({ booking, show, onClose }) => {
    if (!booking) {
      return null; // If booking is null or undefined, don't render anything
    }
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Booking ID</td>
              <td>{booking.bookingId}</td>
            </tr>
            <tr>
              <td>User ID</td>
              <td>{booking.userId}</td>
            </tr>
            <tr>
              <td>Booking Date</td>
              <td>{booking.bookingDate}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{booking.status}</td>
            </tr>
            {/* Display services information */}
            <tr>
              <td>Services</td>
              <td>
                <ul>
                  {booking.services.map((service) => (
                    <li key={service.serviceId}>
                      {service.serviceName} - {service.description} ($ {service.price})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
            {/* Display amount information */}
            <tr>
              <td>Amount</td>
              <td>
                <p>Booking Amount: ${booking.amount.amount}</p>
                <p>GST: ${booking.amount.gst}</p>
                <p>Final Amount: ${booking.amount.finalAmount}</p>
              </td>
            </tr>
            {/* Display payment information */}
            <tr>
              <td>Payment</td>
              <td>
                <p>Payment ID: {booking.payment.paymentId}</p>
                <p>Payment Date: {booking.payment.paymentDate}</p>
                <p>Payment Status: {booking.payment.paymentStatus}</p>
                <p>Payment Mode: {booking.payment.paymentMode}</p>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingDetailsModal;
