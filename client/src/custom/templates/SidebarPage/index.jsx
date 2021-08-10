/* React imports */
import React from 'react';
import './index.css';

/* Custom components */
import Slot from '../../../core/containers/Slot';

function SidebarPage() {
  return (
    <div className="container">
      <Slot slotKey="HEADER_CONTENT_SLOT" />
      <div className="SidebarPage-main">
        <Slot slotKey="SIDEBAR_CONTENT_SLOT" />
        <Slot slotKey="MAIN_CONTENT_SLOT" />
      </div>
      <Slot slotKey="FOOTER_CONTENT_SLOT" />
    </div>
  );
}

export default SidebarPage;
