/* React imports */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* Custom imports */
import RouteRenderer from './core/containers/RouteRenderer';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RouteRenderer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
