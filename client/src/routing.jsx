/* React imports */
import React from 'react';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

/* Custom imports */
import RouteRenderer from './core/containers/RouteRenderer';

function Routing() {
  return (
    <BrowserRouter>
      <Switch>
        <RouteRenderer />
      </Switch>
    </BrowserRouter>
  );
}

export default Routing;
