/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import { Col } from 'react-bootstrap';

function LoginFormContent({ attributes }) {
  /* TODO: implement login form with the corresponding action that sends the API call */
  return (
    <Col xs={12} className="d-flex flex-column align-items-center">
      {`login form ${attributes}`}
    </Col>
  );
}

LoginFormContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

LoginFormContent.defaultProps = {
  attributes: [],
};

export default LoginFormContent;
