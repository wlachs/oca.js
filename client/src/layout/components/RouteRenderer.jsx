/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Custom imports */
import { getRoute } from '../redux/actions';

function RouteRenderer({ route, path, getRoute_ }) {
  useEffect(() => {
    if (path) {
      getRoute_(path);
    }
  }, [path]);
  return (
    <div>
      {JSON.stringify(route)}
    </div>
  );
}

RouteRenderer.propTypes = {
  route: PropTypes.objectOf(PropTypes.any),
  path: PropTypes.string,
  getRoute_: PropTypes.func,
};

RouteRenderer.defaultProps = {
  route: null,
  path: null,
  getRoute_: null,
};

function mapStateToProps(state) {
  return {
    route: state.layout.route,
    path: state.layout.path || state.core.defaultRoute,
  };
}

const mapDispatchToProps = {
  getRoute_: getRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteRenderer);
