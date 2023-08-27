import React from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BookServiceSVG from '../img/booking.svg';
import AddCustomerBooking from './AddCustomerBooking';


const CustomerTables = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [booked, setBooked] = useState({ bookingId: 0, status: '', bookingDate: '' });
  var i = 1;
  const [bookingIds, setBookingIds] = useState([]);


  useEffect(() => {
    const ids = bookings.map((booking) => booking.bookingId);
    setBookingIds(ids);
  }, [bookings]);

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
    fetchPayments();
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




  // Sample bookings data (replace with actual data)
  // const bookings = [
  //   { id: 1, date: '2023-08-22', bookingStatus: 'Confirmed', paymentStatus: 'Paid' },
  //   { id: 2, date: '2023-08-25', bookingStatus: 'Pending', paymentStatus: 'Unpaid' },
  //   // ... more booking objects
  // ];

  // const feedback = [
  //   { id: 1, rating: 5, comment: 'Great service!' },
  //   { id: 2, rating: 4, comment: 'Satisfied with the service.' },
  //   // ... more feedback objects
  // ];

  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // const payments = [
  //   { id: 1, date: '2023-08-22', paymentMode: 'Credit Card', paymentStatus: 'Paid' },
  //   { id: 2, date: '2023-08-25', paymentMode: 'PayPal', paymentStatus: 'Pending' },
  //   // ... more payment objects
  // ];



  const [feedback, setFeedback] = useState([]); // Add this line to define feedback state
  const [newRating, setNewRating] = useState(0); // Add this line to define newRating state
  const [newComment, setNewComment] = useState(''); // Add this line to define newComment state
  const [showEditModal, setShowEditModal] = useState(false); // Add this line to define showEditModal state
  const [showAddModal, setShowAddModal] = useState(false); // Add this line to define showAddModal state
  const [editedFeedback, setEditedFeedback] = useState({}); // Add this line to define editedFeedback state

  const handleEditFeedback = (feedback) => {
    setEditedFeedback({ id: feedback.id, rating: feedback.rating, comment: feedback.comment });
    setShowEditModal(true);
  };

  const saveEditedFeedback = () => {
    const updatedFeedback = feedback.map((item) =>
      item.id === editedFeedback.id ? editedFeedback : item
    );
    setFeedback(updatedFeedback);
    setShowEditModal(false);
  };

  // const addFeedback = () => {
  //   const newFeedback = { id: feedback.length + 1, rating: newRating, comment: newComment };
  //   setFeedback([...feedback, newFeedback]);
  //   setShowAddModal(false);
  //   setNewRating(0);
  //   setNewComment('');
  // };

  const addFeedback = async (rating, comment, bookingId) => {
    try {
      const newFeedback = { rating, comment, bookingId };
      const response = await axios.post('http://localhost:8080/feedbacks', newFeedback);
      setFeedback([...feedback, response.data]);
      setShowAddModal(false);
      setNewRating(0);
      setNewComment('');
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  const updateFeedback = async (feedbackToUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/feedbacks/${feedbackToUpdate.id}`,
        feedbackToUpdate
      );
      const updatedFeedback = feedback.map(item =>
        item.id === feedbackToUpdate.id ? response.data : item
      );
      setFeedback(updatedFeedback);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`http://localhost:8080/feedbacks/${feedbackId}`);
      const updatedFeedback = feedback.filter(item => item.id !== feedbackId);
      setFeedback(updatedFeedback);
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  // const fetchFeedbacks = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/users/feedbacks`);
  //     setFeedback(response.data);
  //   } catch (error) {
  //     console.error('Error fetching feedbacks:', error);
  //   }
  // };

  // useEffect(() => {

  //   for(var i=0;i<bookingIds.length;i++){
  //     fetchFeedbacks(bookingIds[i]);
  //   }

  // }, []);

  useEffect(() => {
    const fetchFeedbacksForBookings = async () => {
      try {
        const feedbackPromises = bookingIds.map(async (bookingId) => {
          const response = await axios.get(`http://localhost:8080/feedbacks`);
          return response.data;
        });

        const feedbackData = await Promise.all(feedbackPromises);
        const allFeedbacks = feedbackData.flat();

        setFeedback(allFeedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacksForBookings();
  }, [bookingIds]);

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

      if (response.status === 200) {
        fetchPayments();
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error('Error making payment:', error);
    }
  };
  const [showBookingSection, setShowBookingSection] = useState(false);
  const handleBooking = () => { setShowBookingSection(true); }

  return (
    <>


      <div>
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
      </div>


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
                      {/* <Button variant="danger" size="sm" onClick={() => cancelBooking(booking)}>Cancel</Button> */}

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
                  <th>Amount</th> {/* Add this column */}
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id}>
                    <td>{payment.paymentId}</td>
                    <td>{payment.paymentDate}</td>
                    <td>{payment.paymentMode}</td>
                    <td>{payment.paymentStatus}</td>
                    <td>{payment.amount}</td>
                    <td>
                      <Button variant="primary" size="sm" onClick={() => handlePayClick(payment)}>
                        Pay
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          {/* <Tab eventKey='feedback' title='Feedback'>
            <Button
              variant='primary'
              size='sm'
              className='mb-3'
              onClick={() => setShowAddModal(true)}
            >
              Give Feedback
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.rating}</td>
                    <td>{item.comment}</td>
                    <td>
                      <Button
                        variant='primary'
                        size='sm'
                        onClick={() => handleEditFeedback(item)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant='danger'
                        size='sm'
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab> */}
          <Tab eventKey='feedback' title='Feedback'>
            <Button
              variant='primary'
              size='sm'
              className='mb-3'
              onClick={() => setShowAddModal(true)}
            >
              Give Feedback
            </Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.rating}</td>
                    <td>{item.comment}</td>
                    <td>
                      <Button
                        variant='primary'
                        size='sm'
                        onClick={() => handleEditFeedback(item)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant='danger'
                        size='sm'
                        onClick={() => deleteFeedback(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>


          {/* <Tab eventKey="feedback" title="Feedback">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.rating}</td>
                    <td>{item.comment}</td>
                    <td>
                      <Button variant="primary" size="sm">Details</Button>{' '}
                      <Button variant="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab> */}

          <Tab eventKey='services' title='Services'>
            {showBookingSection ? (
              <AddCustomerBooking user={user} />
            ) : (
              <Button variant="success" onClick={handleBooking}>Book Service</Button>
            )}
          </Tab>

        </Tabs>
      </MDBCardBody>
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={addFeedback}>
            Add Feedback
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type='number'
                value={editedFeedback.rating}
                onChange={(e) =>
                  setEditedFeedback({ ...editedFeedback, rating: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={editedFeedback.comment}
                onChange={(e) =>
                  setEditedFeedback({ ...editedFeedback, comment: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={saveEditedFeedback}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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



    </>
  );
}

export default CustomerTables;