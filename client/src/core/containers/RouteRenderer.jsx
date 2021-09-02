/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { getRoute } from '../redux/actions';

/* Custom containers */
import LoadingIndicator from './LoadingIndicator';
import Template from './Template';

function RouteRenderer({ route, getRoute_, location }) {
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
  route: PropTypes.objectOf(PropTypes.any),
  getRoute_: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
};

RouteRenderer.defaultProps = {
  route: null,
  getRoute_: null,
  location: null,
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
