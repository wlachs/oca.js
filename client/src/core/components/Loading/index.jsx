/* React imports */
import React from 'react';
import './index.css';

/* Component imports */
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <Spinner animation="border" role="status" className="Loading-Spinner" />
  );
}

export default Loading;
