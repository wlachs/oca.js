/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { getDefaultRoute, init } from './core/redux/actions';

/* Component imports */
import FullLoadingPage from './core/containers/FullLoadingPage';
import Routing from './routing';

function App({ loading, init_, getDefaultRoute_ }) {
  /* TODO: error message handling, preferably as high in the stack as possible */
  useEffect(() => {
    init_();
    getDefaultRoute_();
  }, []);

  if (loading) {
    return (
      <FullLoadingPage />
    );
  }
  return (
    <Routing />
  );
}

App.propTypes = {
  loading: PropTypes.bool,
  init_: PropTypes.func,
  getDefaultRoute_: PropTypes.func,
};

App.defaultProps = {
  loading: true,
  init_: null,
  getDefaultRoute_: null,
};

function mapStateToProps(state) {
  return {
    loading: state.core.loading,
  };
}

const mapDispatchToProps = {
  init_: init,
  getDefaultRoute_: getDefaultRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
