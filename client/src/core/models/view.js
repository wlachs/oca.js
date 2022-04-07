import PropTypes from 'prop-types';
import Slot from './slot';
import Content from './content';
import Template from './template';

export default PropTypes.shape({
  key: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  template: Template.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({
    slot: Slot,
    content: Content,
  })).isRequired,
});
