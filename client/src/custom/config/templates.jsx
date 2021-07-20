/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import Sample from '../templates/Sample';

function GetTemplate({ templateKey }) {
  switch (templateKey) {
    case 'SAMPLE_TEMPLATE': return <Sample />;
    default: return null;
  }
}

GetTemplate.propTypes = {
  templateKey: PropTypes.string.isRequired,
};

export default GetTemplate;
