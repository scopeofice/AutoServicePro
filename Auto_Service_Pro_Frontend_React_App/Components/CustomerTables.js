import React from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddCustomerBooking from './AddCustomerBooking';


const CustomerTables = ({ user }) => {


  //Booking Table starts

  var i = 1;
  const [bookings, setBookings] = useState([]);
  const [booked, setBooked] = useState({ bookingId: 0, status: '', bookingDate: '' });
  const [bookingIds, setBookingIds] = useState([]);
  const [showBookingSection, setShowBookingSection] = useState(false);
  const handleBooking = () => { setShowBookingSection(true); }

  const fetchBookings = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/cutomers/${email}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings(user.email);
  }, []);



  const cancelBooking = async (bookingToCancel) => {
    try {
      const updatedBooking = { ...bookingToCancel, status: 'CANCELLED' };
      const resp = await axios.put(
        `http://localhost:8080/bookings/${updatedBooking.bookingId}`,
        updatedBooking
      );

      if (resp.status === 201) {
        fetchBookings(user.email);
      } else {
        console.error('Booking cancellation failed.');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  //Booking table end


  // ------------------------------------------------------------------------------

  //Payment table starts


  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const bookingIds = bookings.map((booking) => booking.bookingId);
    setBookingIds(bookingIds);
    if (bookingIds.length > 0) {
      fetchPayments(bookingIds);
    }
  }, [bookings]);

  const fetchPayments = async (bookingIds) => {
    try {
      const promises = bookingIds.map(async (id) => {
        const response = await axios.get(`http://localhost:8080/payments/${id}`);
        return response.data;
      });

      const paymentsData = await Promise.all(promises);
      const allPayments = paymentsData.flat();
      setPayments(allPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };



  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMode, setPaymentMode] = useState('');

  const handlePayClick = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async () => {
    alert(selectedPayment.paymentId + " " + user.userId + " " + paymentMode)
    try {
      const response = await axios.post(`http://localhost:8080/payments/payment?bookingId=${selectedPayment.paymentId}&userId=${user.userId}&paymentMode=${paymentMode}`);

      if (response.status === 201) {
        fetchPayments();
        setShowPaymentModal(false);
        handleFeedbackClick();
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };


  //Payment table end


  // ------------------------------------------------------------------------------

  //Feedback table starts


  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleFeedbackClick = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  const submitFeedback = async () => {
    try {
      const newFeedback = {
        rating: feedbackRating,
        comment: feedbackComment,
      };

      const response = await axios.post('http://localhost:8080/feedbacks', newFeedback);

      if (response.status === 201) {
        handleCloseFeedbackModal();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };







  return (
    <>


      <MDBCardBody className='p-3 mx-auto w-100'>
        <Tabs
          defaultActiveKey="bookings"
          id="bookings"
          className="mb-3"
          fill
        >
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
                    <td>{booking.payment ? booking.payment.paymentStatus : 'N/A'}</td>
                    <td>
                      <Button variant="primary" size="sm">Details</Button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="payments" title="Payments">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.paymentId}</td>
                    <td>{payment.paymentDate}</td>
                    <td>{payment.paymentMode}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.amount}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePayClick(payment)}
                        disabled={payment.paymentStatus === 'COMPLETED'}
                      >
                        Pay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          <Tab eventKey='services' title='Services'>
            {showBookingSection ? (
              <AddCustomerBooking user={user} />
            ) : (
              <Button variant="success" onClick={handleBooking}>Book Service</Button>
            )}
          </Tab>

        </Tabs>
      </MDBCardBody>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Amount: {selectedPayment?.amount}</p>
          <Form.Group>
            <Form.Label>Payment Mode</Form.Label>
            <Form.Control
              as="select"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="">Select Payment Mode</option>
              <option value="UPI">UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="DebitCard">Debit Card</option>
              <option value="CreditCard">Credit Card</option>
              <option value="CASH">Cash</option>
            </Form.Control>
          </Form.Group>
          {paymentMode === 'UPI' && (
            <Form.Group>
              <Form.Label>Enter your UPI ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your UPI ID"
              />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePaymentSubmit}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal}>
        <Modal.Header>
          <Modal.Title>Give Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={feedbackRating}
              onChange={(e) => setFeedbackRating(parseInt(e.target.value, 10))}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedbackModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitFeedback}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default CustomerTables;