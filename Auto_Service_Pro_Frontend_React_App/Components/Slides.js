import Carousel from 'react-bootstrap/Carousel';
import firstSide from '../img/tyre.jpg';
import secSlide from '../img/carousel-bg-1.jpg';
import thirdSlide from '../img/carousel-bg-2.jpg';
import '../StyleSheets/MyStyle.css';
function Slides() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
      <div className="overlay"></div>
      <img
          src={firstSide}
          alt="First slide"
          className="d-block w-100"
          style={{ objectFit: 'cover', height: '300px' }}
        />
        <Carousel.Caption>
          <h1>Welcome To</h1>
          <h3>Auto Service Pro</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
      <div className="overlay"></div>
        <img src={secSlide} alt="First slide"
          className="d-block w-100"
          style={{ objectFit: 'cover', height: '300px' }} />
        <Carousel.Caption>
          <h3>Qualified Car Repair</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
      <div className="overlay"></div>
        <img src={thirdSlide} alt="First slide"
          className="d-block w-100"
          style={{ objectFit: 'cover', height: '300px' }} />
        <Carousel.Caption>
          <h2>Qualified Car Wash</h2>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slides;