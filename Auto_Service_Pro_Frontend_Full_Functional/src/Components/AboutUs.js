import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import car from '../img/car.svg';
import teamSvg from '../img/Team.svg';

const AboutUs = () => {

    const cardStyle = {
        background: 'rgb(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
    };

    const backgroundStyle = {
        background: 'rgb(40, 40, 43)',
        color: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <>
            <MDBContainer fluid style={backgroundStyle}>
                <div className="container-xxl py-5">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div style={cardStyle}>
                                    <img
                                        src={teamSvg}
                                        alt="Team"
                                        style={{ width: '100px', height: '100px', maxWidth: '100%' }}
                                    />
                                    <div className="ps-4">
                                        <h2 className="mb-3">About Our Team</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porttitor, mollis magna ut, gravida velit. Praesent auctor elit vel semper fermentum.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div style={cardStyle}>
                                <img
                                        src={car}
                                        alt="mission"
                                        style={{ width: '100px', height: '100px', maxWidth: '100%' }}
                                    />
                                    <h2 className="mb-3">Our Mission</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porttitor, mollis magna ut, gravida velit. Praesent auctor elit vel semper fermentum.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MDBContainer>
        </>
    );
}

export default AboutUs;
