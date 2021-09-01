/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

function MissingContent({ what }) {
  const text = `Missing content: ${what}`;

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      {text}
    </div>
  );
}

MissingContent.propTypes = {
  what: PropTypes.string.isRequired,
};

export default MissingContent;
