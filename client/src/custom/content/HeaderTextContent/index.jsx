/* React imports */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import { Col, Row } from 'react-bootstrap';

function ElementToText({ selector, value }) {
  switch (selector.toLowerCase()) {
    case 'h1':
      return (
        <Row>
          <Col xs={12} className="text-center my-3">
            <h1>{value}</h1>
          </Col>
        </Row>
      );

    case 'h2':
      return (
        <Row>
          <Col xs={12} className="text-center my-3">
            <h2>{value}</h2>
          </Col>
        </Row>
      );

    default:
      return null;
  }
}

ElementToText.propTypes = {
  selector: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function HeaderTextContent({ attributes }) {
  return attributes.map(
    ({ key, value }) => <ElementToText key={`${key}${value}`} selector={key} value={value} />,
  );
}

HeaderTextContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

HeaderTextContent.defaultProps = {
  attributes: [],
};

export default HeaderTextContent;
