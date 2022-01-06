/* React imports */
import React from 'react';
import './index.css';

/* Component imports */
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div className="Loading-Spinner">
      <div className="Spinner-Frame">
        <Spinner animation="border" role="status" className="Spinner-Body" />
      </div>
    </div>
  );
}

export default Loading;
