/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Custom imports */
import getContent from '../../custom/config/contents';

function Slot({ slotKey, content, className }) {
  const contentSlot = content.find((c) => c.slot.key === slotKey);
  const contentKey = contentSlot.content.key;
  const contentType = contentSlot.content.type.key;
  const contentAttributes = contentSlot.content.attributes;
  const Content = getContent(contentKey, contentType);

  return (
    <Content className={className} attributes={contentAttributes} />
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
