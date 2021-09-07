/* React imports */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';

/* Custom alert types */
export const SUCCESS_ALERT_TYPE = 'success';
export const INFO_ALERT_TYPE = 'info';
export const WARNING_ALERT_TYPE = 'warning';
export const ERROR_ALERT_TYPE = 'error';

function generateAlertStyle(type) {
  switch (type) {
    case SUCCESS_ALERT_TYPE:
      return 'alert-success';

    case INFO_ALERT_TYPE:
      return 'alert-info';

    case WARNING_ALERT_TYPE:
      return 'alert-warning';

    case ERROR_ALERT_TYPE:
      return 'alert-danger';

    default:
      return null;
  }
}

function AlertMessage({ type, message }) {
  const alertStyle = generateAlertStyle(type);

  return (
    <Row className="position-absolute w-100 m-0 mt-2 p-0">
      <Col
        xs={11}
        md={6}
        lg={4}
        xxl={3}
        className={`m-auto d-flex flex-column justify-content-center align-items-center alert ${alertStyle}`}
      >
        <h2>{message}</h2>
      </Col>
    </Row>
  );
}

AlertMessage.propTypes = {
  type: PropTypes.oneOf([
    SUCCESS_ALERT_TYPE,
    INFO_ALERT_TYPE,
    WARNING_ALERT_TYPE,
    ERROR_ALERT_TYPE,
  ]),
  message: PropTypes.string,
};

AlertMessage.defaultProps = {
  type: INFO_ALERT_TYPE,
  message: 'Alert',
};

export default AlertMessage;
