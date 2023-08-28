
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import RouterPath from './Components/RouterPath';
import { Container,Row } from 'react-bootstrap';
function App() {
  return (
    <div className="App">

<Container>
        <Row>
          <Header/>
        </Row>
        <Row>
          <RouterPath/>
        </Row>
        <Row>
          <Footer/>
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
