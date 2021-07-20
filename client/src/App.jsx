/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { getDefaultRoute } from './core/redux/actions';

/* Component imports */
import FullLoadingPage from './core/containers/FullLoadingPage';
import Routing from './routing';

function App({ loading, getDefaultRoute_ }) {
  /* TODO: error message handling, preferably as high in the stack as possible */
  useEffect(() => {
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
  getDefaultRoute_: PropTypes.func,
};

App.defaultProps = {
  loading: true,
  getDefaultRoute_: null,
};

function mapStateToProps(state) {
  return {
    loading: state.core.loading,
  };
}

const mapDispatchToProps = {
  getDefaultRoute_: getDefaultRoute,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
