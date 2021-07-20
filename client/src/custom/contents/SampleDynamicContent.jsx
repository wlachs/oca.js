/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

function SampleDynamicContent({ attributes }) {
  return (
    <div>
      Sample Dynamic Content 1
      Attributes:
      {JSON.stringify(attributes)}
    </div>
  );
}

SampleDynamicContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.any),
};

SampleDynamicContent.defaultProps = {
  attributes: null,
};

export default SampleDynamicContent;
