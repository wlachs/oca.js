/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

/* Redux imports */
import { connect } from 'react-redux';
import { getRoute } from '../redux/actions';

/* Custom containers */
import LoadingIndicator from './LoadingIndicator';
import Template from './Template';
import Route from '../models/route';

function RouteRenderer({ route, getRoute_ }) {
  const location = useLocation();
  useEffect(() => {
    getRoute_(location.pathname);
  }, [location]);

  if (!route) {
    return <LoadingIndicator />;
  }

  return (
    <Template />
  );
}

RouteRenderer.propTypes = {
  route: Route,
  getRoute_: PropTypes.func,
};

RouteRenderer.defaultProps = {
  route: null,
  getRoute_: null,
};

function mapStateToProps(state) {
  return {
    route: state.core.route,
  };
}

const mapDispatchToProps = {
  getRoute_: getRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteRenderer);
