import PropTypes from 'prop-types';
import ContentType from './contentType';

const Attribute = PropTypes.shape({
  key: PropTypes.string.isRequired,
  value: PropTypes.string,
});

export default PropTypes.shape({
  key: PropTypes.string.isRequired,
  type: ContentType.isRequired,
  attributes: PropTypes.arrayOf(Attribute).isRequired,
});
