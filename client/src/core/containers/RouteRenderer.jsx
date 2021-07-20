/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { getRoute } from '../redux/actions';

/* Custom containers */
import FullLoadingPage from './FullLoadingPage';
import TemplatePopulator from '../components/TemplatePopulator';

function RouteRenderer({ route, path, getRoute_ }) {
  useEffect(() => {
    if (route && path && route.path !== path) {
      getRoute_(path);
    }
  }, [path]);

  if (!route) {
    return <FullLoadingPage />;
  }

  return (
    <TemplatePopulator template={route.view.template.key} content={route.view.content} />
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
    route: state.core.route,
    path: state.core.path,
  };
}

const mapDispatchToProps = {
  getRoute_: getRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteRenderer);
