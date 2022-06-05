/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';
import { Links, LogoLink } from './common';

function Desktop({ links }) {
  return (
    <Row className="d-none d-lg-block">
      <Col lg={10} className="d-flex justify-content-between align-items-center mx-auto mb-5">
        <LogoLink />
        <div className="d-flex flex-row-reverse justify-content-center align-items-center">
          <Links links={links} />
        </div>
      </Col>
    </Row>
  );
}

Desktop.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

Desktop.defaultProps = {
  links: [],
};

export default Desktop;
