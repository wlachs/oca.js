/* React imports */
import React from 'react';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';
import { Links, LogoLink } from './common';

function Desktop() {
  return (
    <Row className="d-none d-lg-block">
      <Col lg={10} className="d-flex justify-content-between align-items-center mx-auto mb-5">
        <LogoLink />
        <div className="d-flex flex-row-reverse justify-content-center align-items-center">
          <Links />
        </div>
      </Col>
    </Row>
  );
}

export default Desktop;
