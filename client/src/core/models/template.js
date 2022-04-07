import PropTypes from 'prop-types';
import Slot from './slot';

export default PropTypes.shape({
  key: PropTypes.string.isRequired,
  slots: PropTypes.arrayOf(Slot),
});
