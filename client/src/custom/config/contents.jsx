/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import SampleContent1 from '../contents/SampleContent1';

function GetContent({ contentKey }) {
  switch (contentKey) {
    case 'SAMPLE_CONTENT_1': return <SampleContent1 />;
    default: return null;
  }
}

GetContent.propTypes = {
  contentKey: PropTypes.string.isRequired,
};

export default GetContent;
