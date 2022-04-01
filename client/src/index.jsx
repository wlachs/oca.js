/* Misc imports */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-roboto';

/* React imports */
import React from 'react';
import ReactDOMClient from 'react-dom/client';

/* Redux imports */
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import redux from './redux';

/* Custom imports */
import App from './App';
import LoadingIndicator from './core/containers/LoadingIndicator';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={redux.store}>
    <PersistGate loading={<LoadingIndicator />} persistor={redux.persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
