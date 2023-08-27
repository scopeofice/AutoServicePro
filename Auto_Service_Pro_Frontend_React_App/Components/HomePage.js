import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import React from 'react';
import qualitySvg from '../img/quality-svgrepo-com.svg';
import expSvg from '../img/mechanic-svgrepo-com.svg';
import toolSvg from '../img/tools-svgrepo-com.svg';
import Slides from './Slides';
import SevriceSlides from './ServicesSlides';

const HomePage = () => {

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
                <div>
                    <Slides />
                </div>

                <div style={{ position: 'relative' }}>
                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="row g-4">
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div style={cardStyle}>
                                        <img
                                            src={qualitySvg}
                                            alt="Quality"
                                            style={{ width: '100px', height: '100px', maxWidth: '100%' }}
                                        />
                                        <div className="ps-4">
                                            <h5 className="mb-3">Quality Servicing</h5>
                                            <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                            <a className="text-primary border-bottom" href="">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div style={cardStyle}>
                                        <img
                                            src={expSvg}
                                            alt="exp"
                                            style={{ width: '100px', height: '100px', maxWidth: '100%' }}
                                        />
                                        <div className="ps-4">
                                            <h5 className="mb-3">Expert Workers</h5>
                                            <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                            <a className="text-primary border-bottom" href="">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div style={cardStyle}>
                                        <img
                                            src={toolSvg}
                                            alt="tools"
                                            style={{ width: '100px', height: '100px', maxWidth: '100%' }}
                                        />
                                        <div className="ps-4">
                                            <h5 className="mb-3">Modern Equipment</h5>
                                            <p>Diam dolor diam ipsum sit amet diam et eos erat ipsum</p>
                                            <a className="text-primary border-bottom" href="">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='service'>
                    <SevriceSlides />
                </div>
            </MDBContainer>
            
        </>
    );
}

export default HomePage;
