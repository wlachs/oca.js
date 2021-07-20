/* React imports */
import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

function FullPage({ children }) {
  return (
    <div id="FullPage-Frame">
      {children}
    </div>
  );
}

FullPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
};

FullPage.defaultProps = {
  children: null,
};

export default FullPage;
