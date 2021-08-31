/* React imports */
import React from 'react';
import '../components/Loading/index.css';

/* Component imports */
import FullPage from '../components/FullPage';
import Loading from '../components/Loading';

function LoadingIndicator() {
  return (
    <FullPage>
      <Loading />
    </FullPage>
  );
}

export default LoadingIndicator;
