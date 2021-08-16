/* React imports */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import './index.css';

/* Custom components */
import Slot from '../../../core/containers/Slot';

function SimplePage() {
  return (
    <Container fluid className="m-0 p-0 min-vh-100 py-4">
      <Row>
        <Col xs={12}>
          <Slot slotKey="TOP_BAR_SLOT" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Slot slotKey="PAGE_HEADER_SLOT" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Slot slotKey="MAIN_CONTENT_SLOT" />
        </Col>
      </Row>
    </Container>
  );
}

export default SimplePage;
