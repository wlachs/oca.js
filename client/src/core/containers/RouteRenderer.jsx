/* React imports */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { getRoute } from '../redux/actions';

/* Custom containers */
import LoadingIndicator from './LoadingIndicator';
import Template from './Template';

function RouteRenderer({
  route, getRoute_, location, navigationTrigger,
}) {
  const history = useHistory();
  useEffect(() => {
    if (navigationTrigger && navigationTrigger !== location.pathname) {
      history.push(navigationTrigger);
    } else if (!route || (location.pathname !== route.path)) {
      getRoute_(location.pathname);
    }
  }, [location, navigationTrigger]);

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
  navigationTrigger: PropTypes.string,
};

RouteRenderer.defaultProps = {
  route: null,
  getRoute_: null,
  location: null,
  navigationTrigger: null,
};

function mapStateToProps(state) {
  return {
    route: state.core.route,
    navigationTrigger: state.core.navigationTrigger,
  };
}

const mapDispatchToProps = {
  getRoute_: getRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteRenderer);
