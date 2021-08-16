/* React imports */
import React from 'react';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';

function HomeImageContent() {
  return (
    <Row>
      <Col xs={8} md={6} lg={4} className="m-auto">
        <img
          src="/assets/custom/HomeImage/drawing.svg"
          alt="Drawing"
          className="h-100 w-100"
        />
      </Col>
    </Row>
  );
}

export default HomeImageContent;
