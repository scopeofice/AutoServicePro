import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import car from '../img/carServ.svg';
import engineTuneup from '../img/tuning-up--engine.jpg';
import wheelAline from '../img/wheels-allingment.jpg';
import coolant from '../img/coolant.jpg';
import Tyre from '../img/tyre.jpg';
import filter from '../img/filter.jpg';
import battery from '../img/battery.jpg';
import breakrep from '../img/break.jpg';
import PaymentGateway from './PaymentGateway';

const BookingService = () => {

  var i=0;
  const servicImg = [filter,Tyre,battery,breakrep,coolant,engineTuneup,wheelAline,car];
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [data,setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); // Initialize total amount state
  const [isPaymentVisible, setIsPaymentVisible] = useState(false); // Initialize payment visibility state
  const nav=useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/service');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

//   const handlePaymentSuccess = () => {
//     axios
//       .post('http://localhost:8080/bookings/addBooking', bookingRequest)
//       .then((response) => {
//         setData({ user: response.data });
//         nav('/User', { state: { user: response.data } });
//       })
//       .catch((error) => {
//         console.error('Error creating booking:', error);
//       });
//   };

// const handlePaymentSuccess = () => {
//     const bookingRequest = {
//       services: selectedServices.map((service) => ({
//         serviceName: service.serviceName,
//         description: service.description,
//         price: service.price,
//       })),
//     };

//     axios
//       .post('http://localhost:8080/bookings/addBooking', bookingRequest)
//       .then((response) => {
//         setData({ user: response.data });
//         // Redirect to the PaymentGateway component
//         nav('/Payment', { state: { totalAmount, bookingRequest } });
//       })
//       .catch((error) => {
//         console.error('Error creating booking:', error);
//       });
//   };

  // const handlePaymentSuccess = () => {
  //   const bookingRequest = {
  //     services: selectedServices.map((service) => ({
  //       serviceId: service.serviceId,
  //       serviceName: service.serviceName,
  //       description: service.description,
  //       price: service.price,
  //     })),
  //   };
  
  //   axios
  //     .post('http://localhost:8080/customers/bookings/addBooking', bookingRequest)
  //     .then((response) => {
  //       const bookingId = response.data.bookingId; // Assuming the response contains the booking ID
  //       const userId = response.data.userId; // Assuming the response contains the user ID
  
  //       // Call the API to update payment status
  //       axios
  //         .post('http://localhost:8080/payments/payment', null, {
  //           params: {
  //             bookingId: bookingId,
  //             userId: userId,
  //             paymentMode: 'CASH', // Set the payment mode here
  //           },
  //         })
  //         .then((paymentResponse) => {
  //           // Payment successfully saved and status updated
  //           setData({ user: response.data });
  //           // Redirect to the PaymentGateway component
  //           nav('/Payment', { state: { totalAmount, bookingRequest } });
  //         })
  //         .catch((error) => {
  //           console.error('Error updating payment status:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error creating booking:', error);
  //     });
  // };

  const handlePaymentSuccess = () => {
    const bookingRequest = {
      bookingId: 0, // Fill in with the appropriate booking ID, if available
      userId: 0,    // Fill in with the appropriate user ID, if available
      services: selectedServices.map((service) => ({
        serviceId: service.serviceId, // Assuming there's a unique service ID
        serviceName: service.serviceName,
        description: service.description,
        price: service.price,
      })),
    };
  
    axios
      .post('http://localhost:8080/bookings/addBooking', bookingRequest)
      .then((response) => {
        const bookingId = response.data.bookingId; // Assuming the response contains the booking ID
        const userId = response.data.userId;       // Assuming the response contains the user ID
  
        // Call the API to update payment status
        axios
          .post('http://localhost:8080/payments/payment', null, {
            params: {
              bookingId: bookingId,
              userId: userId,
              paymentMode: 'CASH', // Set the payment mode here
            },
          })
          .then((paymentResponse) => {
            // Payment successfully saved and status updated
            setData({ user: response.data });
            // Redirect to the PaymentGateway component
            nav('/Payment', { state: { totalAmount, bookingRequest } });
          })
          .catch((error) => {
            console.error('Error updating payment status:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
      });
  };
  
  

  const proceedToPay = () => {
    const bookingRequest = {
      services: selectedServices.map((service) => ({
        serviceName: service.serviceName,
        description: service.description,
        price: service.price,
      })),
    };

    // Calculate total amount based on selected services
    const totalAmount = selectedServices.reduce((total, service) => total + service.price, 0);

    // Set the data and total amount to show the PaymentGateway component
    // setData({ user: response.data }); // Replace with appropriate data
    setTotalAmount(totalAmount);
    setIsPaymentVisible(true);
  };

  return (
    <div>
      <h2>Available Services</h2>
      <div className="card-container">
        {services.map((service) => (
          <Card key={service.serviceName}>
            <Row>
              <Col md={4}>
                <Card.Img src={servicImg[i++]} alt={service.serviceName} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>{service.serviceName}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  <Card.Text>Price: {service.price}</Card.Text>
                  <Button
                    variant={selectedServices.includes(service) ? 'success' : 'primary'}
                    onClick={() => handleServiceSelection(service)}
                  >
                    {selectedServices.includes(service) ? 'Selected' : 'Select'}
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
      <Button variant="primary" onClick={proceedToPay} disabled={selectedServices.length === 0}>
        Proceed to Pay
      </Button>
      {isPaymentVisible && (
        <PaymentGateway totalAmount={totalAmount} onPaymentSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default BookingService;


  
  
  