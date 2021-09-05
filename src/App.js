import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import IdGeneratorComponent from "./components/IdGeneratorComponent";
import {Provider} from "react-redux";
import {store} from "./configuration/redux/store";
import Toast from './components/Toast';

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <Container fluid>
                  <Row className="d-flex justify-content-center">
                      <Col md={6}><IdGeneratorComponent/></Col>
                  </Row>
                  <Toast/>
              </Container>
          </div>
      </Provider>
  );
}

export default App;
