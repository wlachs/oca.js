/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Custom imports */
import GetTemplate from '../../custom/config/templates';

function Template({ template }) {
  return (
    <GetTemplate templateKey={template} />
  );
}

Template.propTypes = {
  template: PropTypes.string,
};

Template.defaultProps = {
  template: null,
};

function mapStatesToProps(state) {
  return {
    template: state.core.route.view.template.key,
  };
}

export default connect(mapStatesToProps)(Template);
