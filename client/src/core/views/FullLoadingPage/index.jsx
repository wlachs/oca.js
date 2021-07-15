/* React imports */
import React from 'react';
import './index.css';

/* Component imports */
import Spinner from 'react-bootstrap/Spinner';

function FullLoadingPage() {
  return (
    <div id="FullLoadingPage-Frame">
      <Spinner animation="border" role="status" id="FullLoadingPage-Spinner" />
    </div>
  );
}

export default FullLoadingPage;
