/* React imports */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';
import { LogoLink, Links } from './common';

function Mobile({ links }) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <>
      <Row className="d-block d-lg-none">
        <Col xs={11} className="d-flex justify-content-between align-items-center mx-auto">
          <LogoLink />
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setExpanded(!isExpanded)}
            aria-label="Toggle navigation"
          >
            <img src="/assets/custom/TopBar/burger.svg" height="20" alt="Hamburger menu" />
          </button>
        </Col>
      </Row>
      <Row className="d-block d-lg-none">
        <Col xs={12} className={`${!isExpanded ? 'collapse' : ''}`}>
          <div className="d-flex flex-column-reverse justify-content-center align-items-center">
            <Links links={links} />
          </div>
        </Col>
      </Row>
    </>
  );
}

Mobile.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

Mobile.defaultProps = {
  links: [],
};

export default Mobile;
