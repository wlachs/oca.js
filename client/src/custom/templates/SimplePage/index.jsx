/* React imports */
import React from 'react';
import './index.css';

/* Custom components */
import Slot from '../../../core/containers/Slot';

function SimplePage() {
  return (
    <div className="container">
      <Slot slotKey="HEADER_CONTENT_SLOT" />
      <Slot slotKey="MAIN_CONTENT_SLOT" />
      <Slot slotKey="FOOTER_CONTENT_SLOT" />
    </div>
  );
}

export default SimplePage;
