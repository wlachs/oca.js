/* React imports */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col } from 'react-bootstrap';
import './index.css';

/* Custom components */
import Slot from '../../../core/containers/Slot';

function ThreeComponentPage() {
  return (
    <Container fluid className="m-0 p-0 min-vh-100 py-4 d-flex flex-column">
      <Col xs={12}>
        <Slot slotKey="TOP_BAR_SLOT" />
      </Col>
      <Col xs={12}>
        <Slot slotKey="PAGE_HEADER_SLOT" />
      </Col>
      <Col xs={12} className="d-flex flex-column flex-grow-1 my-3">
        <Slot slotKey="MAIN_CONTENT_SLOT" />
      </Col>
    </Container>
  );
}

export default ThreeComponentPage;
