/* React imports */
import React from 'react';
import './index.css';

/* Custom imports */
import Desktop from './responsive/desktop';
import Mobile from './responsive/mobile';

function TopBarContent() {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
}

export default TopBarContent;
