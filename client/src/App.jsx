/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { init } from './core/redux/actions';

/* Component imports */
import FullLoadingPage from './core/views/FullLoadingPage';

function App({ loading, init_ }) {
  useEffect(() => {
    init_();
  }, []);

  if (loading) {
    return (
      <FullLoadingPage />
    );
  }
  return (
    <div className="App" />
  );
}

App.propTypes = {
  loading: PropTypes.bool,
  init_: PropTypes.func,
};

App.defaultProps = {
  loading: true,
  init_: null,
};

function mapStateToProps(state) {
  return {
    loading: state.core.loading,
  };
}

const mapDispatchToProps = {
  init_: init,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
