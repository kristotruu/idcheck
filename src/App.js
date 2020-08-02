import React from 'react';
import {Container,Row,Col} from "react-bootstrap";
import IdGeneratorComponent from "./components/IdGeneratorComponent";

function App() {
  return (
    <div className="App">
        <Container fluid>
            <Row className="d-flex justify-content-center">
                <Col md={6}><IdGeneratorComponent/></Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
