import PropTypes from 'prop-types';
import ContentType from './contentType';

export default PropTypes.shape({
  key: PropTypes.string.isRequired,
  allowedContentTypes: PropTypes.arrayOf(ContentType),
});
