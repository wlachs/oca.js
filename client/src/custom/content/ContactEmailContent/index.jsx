/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import './index.css';
import { Col, SafeAnchor } from 'react-bootstrap';
import MissingContent from '../MissingContent';
import PureButton from '../../components/PureButton';

const EMAIL_ENTRY_KEY = 'email';

function ContactEmailContent({ attributes }) {
  const emailEntry = attributes.find((entry) => entry.key === EMAIL_ENTRY_KEY);
  if (!emailEntry) {
    return MissingContent;
  }

  return (
    <Col xs={12} className="d-flex justify-content-center my-3">
      <SafeAnchor href={`mailto:${emailEntry.value}`}>
        <PureButton>{emailEntry.value}</PureButton>
      </SafeAnchor>
    </Col>
  );
}

ContactEmailContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

ContactEmailContent.defaultProps = {
  attributes: [],
};

export default ContactEmailContent;
