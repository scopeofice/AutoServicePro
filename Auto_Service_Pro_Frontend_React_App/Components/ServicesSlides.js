import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../StyleSheets/MyStyle.css';
import '../StyleSheets/MyStyle.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import engineTuneup from '../img/tuning-up--engine.jpg';
import wheelAline from '../img/wheels-allingment.jpg';
import coolant from '../img/coolant.jpg';
import Tyre from '../img/tyre.jpg';
import filter from '../img/filter.jpg';
import battery from '../img/battery.jpg';
import breakrep from '../img/break.jpg';




function ServicesSlides() {



    const services = [
        
        {
            title: 'Replace air filter',
            description: 'Replace your vehicle\'s air filter to improve air quality and fuel efficiency.',
            price: '$29.99',
            image: filter,
        },

        {
            title: 'New tires',
            description: 'Upgrade your vehicle with a set of brand new tires for better traction on the road.',
            price: '$199.99',
            image: Tyre,
        },
        {
            title: 'Battery replacement',
            description: 'Replace your old battery with a new one to avoid unexpected breakdowns.',
            price: '$89.99',
            image: battery,
        },
        {
            title: 'Brake work',
            description: 'Ensure your safety on road with our brake maintenance and repair services.',
            price: '$79.99',
            image: breakrep,
        },
        {
            title: 'Antifreeze added',
            description: 'Maintain the proper temperature of your engine with antifreeze in winters.',
            price: '$49.99',
            image: coolant,
        },
        {
            title: 'Engine tune-up',
            description: "Optimize your engine's performance with our comprehensive tune-up.",
            price: '$129.99',
            image: engineTuneup,
        },
        {
            title: 'Wheels aligned/balanced',
            description: 'Improve tire longevity and handling with our wheel alignment and balancing.',
            price: '$59.99',
            image: wheelAline,
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '65px',
    };

    return (
        
        <div className="services-carousel">
            <hr />
            <h2>Service</h2>
            <hr />
            <Slider {...sliderSettings}>
                {services.map((service, index) => (
                    <div key={index} className="service-slide">
                        <Card className="service-card">
                            <Card.Img variant="top" src={service.image} alt={service.title} />
                            <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                                <Card.Text>Price: {service.price}</Card.Text>
                                <Button as={Link} to="/Login" variant="primary">
                                    Book
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Slider>
        </div>
        
    );

}

export default ServicesSlides;
