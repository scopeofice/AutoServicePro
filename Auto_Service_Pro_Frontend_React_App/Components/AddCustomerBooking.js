import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import car from '../img/carServ.svg';
import engineTuneup from '../img/tuning-up--engine.jpg';
import wheelAline from '../img/wheels-allingment.jpg';
import coolant from '../img/coolant.jpg';
import tyre from '../img/tyre.jpg';
import filter from '../img/filter.jpg';
import battery from '../img/battery.jpg';
import breakrep from '../img/break.jpg';
import '../StyleSheets/MyStyle.css';





const AddCustomerBooking = ({ user }) => {
    const [userData,setUserData]=useState(user);
    const [services, setServices] = useState([]);
    const servicImg = [filter, tyre, battery, breakrep, coolant, engineTuneup, wheelAline, car];
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [customerId,setCustomerID]=useState(user.userID);
    const nav = useNavigate();

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

    const proceedToPay = async () => {
        try {
            const bookingData = {
                userId: userData.userId,
                services: selectedServices.map(service => ({
                    serviceId: service.serviceId,
                    serviceName: service.serviceName,
                    description: service.description,
                    price: service.price
                }))
            };

            const response = await axios.post('http://localhost:8080/bookings/addBooking', bookingData);
            
            if (response.status === 201) {
                // nav('/User',{state:{user:userData}});
                window.location.reload();
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <div>
            <h2>Available Services</h2>
            <table className="service-table">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.serviceId}>
                            <td>
                                <img src={servicImg[index]} alt={service.serviceName} className="service-image" />
                            </td>
                            <td>
                                <strong>{service.serviceName}</strong><br />
                                {service.description}
                            </td>
                            <td>${service.price}</td>
                            <td>
                                <Button
                                    variant={selectedServices.includes(service) ? 'success' : 'primary'}
                                    onClick={() => handleServiceSelection(service)}
                                >
                                    {selectedServices.includes(service) ? 'Selected' : 'Select'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button variant="primary" onClick={proceedToPay} disabled={selectedServices.length === 0}>
                Proceed to Pay
            </Button>
        </div>
    );
}

export default AddCustomerBooking;