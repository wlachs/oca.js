/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Custom imports */
import GetContent from '../../custom/config/contents';

function Slot({ slotKey, content, className }) {
  const contentKey = content.find((c) => c.slot.key === slotKey).content.key;

  return (
    <div className={className}>
      <GetContent contentKey={contentKey} />
    </div>
  );
}

Slot.propTypes = {
  slotKey: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.any),
  className: PropTypes.string,
};

Slot.defaultProps = {
  className: '',
  content: null,
};

function mapStateToProps(state) {
  return {
    content: state.core.route.view.content,
  };
}

export default connect(mapStateToProps)(Slot);
