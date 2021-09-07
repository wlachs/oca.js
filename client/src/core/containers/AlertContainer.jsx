/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { clearAlert } from '../redux/actions';

/* Custom components */
import AlertMessage from '../components/AlertMessage';

/* The alert should disappear after this many milliseconds */
const ALERT_DURATION = 5000;

function AlertContainer({ alert, clearAlert_ }) {
  useEffect(() => {
    if (alert) {
      setTimeout(() => clearAlert_(), ALERT_DURATION);
    }
  }, [alert]);

  if (!alert) {
    return React.Fragment;
  }

  return <AlertMessage type={alert.type} message={alert.message} />;
}

AlertContainer.propTypes = {
  alert: PropTypes.objectOf(PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  })),
  clearAlert_: PropTypes.func,
};

AlertContainer.defaultProps = {
  alert: null,
  clearAlert_: null,
};

function mapStateToProps(state) {
  return {
    alert: state.core.alert,
  };
}

const mapDispatchToProps = {
  clearAlert_: clearAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
