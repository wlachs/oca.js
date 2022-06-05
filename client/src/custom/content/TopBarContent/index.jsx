/* React imports */
import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

/* Custom imports */
import Desktop from './responsive/desktop';
import Mobile from './responsive/mobile';

function TopBarContent({ attributes }) {
  return (
    <>
      <Desktop links={attributes} />
      <Mobile links={attributes} />
    </>
  );
}

TopBarContent.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

TopBarContent.defaultProps = {
  attributes: [],
};

export default TopBarContent;
