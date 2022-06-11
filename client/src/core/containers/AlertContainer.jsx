/* React imports */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';
import { clearAlert } from '../redux/thunks';

/* Custom components */
import AlertMessage from '../components/AlertMessage';

/* The alert should disappear after this many milliseconds */
const ALERT_DURATION = 5000;

/* Alert timer ref */
let alertTimeout = 0;

function AlertContainer({
  message, type, uuid, clearAlert_,
}) {
  useEffect(() => {
    if (message && type) {
      if (alertTimeout) {
        clearTimeout(alertTimeout);
      }
      alertTimeout = setTimeout(() => clearAlert_(), ALERT_DURATION);
    }
  }, [uuid]);

  if (!message || !type) {
    return React.Fragment;
  }

  return <AlertMessage type={type} message={message} />;
}

AlertContainer.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  uuid: PropTypes.string,
  clearAlert_: PropTypes.func,
};

AlertContainer.defaultProps = {
  message: null,
  type: null,
  clearAlert_: null,
  uuid: null,
};

function mapStateToProps(state) {
  return {
    message: state.core.alert.message,
    type: state.core.alert.type,
    uuid: state.core.alert.uuid,
  };
}

const mapDispatchToProps = {
  clearAlert_: clearAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
