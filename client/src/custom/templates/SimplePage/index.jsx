/* React imports */
import React from 'react';
import './index.css';

/* Custom components */
import Slot from '../../../core/containers/Slot';

function SimplePage() {
  return (
    <div className="container-fluid col-12 m-0 p-0 min-vh-100 py-4 d-flex flex-column">
      <Slot slotKey="TOP_BAR_SLOT" />
      <Slot slotKey="PAGE_HEADER_SLOT" />
      <Slot slotKey="MAIN_CONTENT_SLOT" />
    </div>
  );
}

export default SimplePage;
