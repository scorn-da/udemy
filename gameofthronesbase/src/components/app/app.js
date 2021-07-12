import React, { useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

const App = () => {
  const [isRandomCharHidden, setIsRandomCharHidden] = useState(false);

  const toggleRandomCharState = () => {
    setIsRandomCharHidden(!isRandomCharHidden);
  };

  return (
    <>
      <Container>
        <Header/>
      </Container>
      <Container>
        <Row>
          <Col lg={{size: 5, offset: 0}}>
            <RandomChar isRandomCharHidden={isRandomCharHidden} />
            <button
              className='btn btn-md btn-primary mb-4'
              onClick={toggleRandomCharState}
            >
              Toggle character widget state
            </button>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <ItemList/>
          </Col>
          <Col md='6'>
            <CharDetails/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;