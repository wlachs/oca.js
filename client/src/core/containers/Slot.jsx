/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Model imports */
import View from '../models/view';

/* Custom imports */
import getContent from '../../custom/config/contents';

function Slot({ slotKey, view, className }) {
  const { content } = view;
  const contentSlot = content.find((c) => c.slot.key === slotKey);
  const contentKey = contentSlot.content.key;
  const contentType = contentSlot.content.type.key;
  const contentAttributes = contentSlot.content.attributes;
  const ContentComponent = getContent(contentKey, contentType);

  return (
    <ContentComponent className={className} attributes={contentAttributes} />
  );
}

Slot.propTypes = {
  slotKey: PropTypes.string.isRequired,
  view: View,
  className: PropTypes.string,
};

Slot.defaultProps = {
  className: '',
  view: null,
};

function mapStateToProps(state) {
  return {
    view: state.core.route.view,
  };
}

export default connect(mapStateToProps)(Slot);
