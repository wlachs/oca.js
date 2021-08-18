/* React imports */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Custom imports */
import getTemplate from '../../custom/config/templates';

function Template({ template, pageTitle }) {
  const T = getTemplate(template);
  return (
    <>
      {/* Page title */}
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Render template */}
      <T />
    </>
  );
}

Template.propTypes = {
  template: PropTypes.string,
  pageTitle: PropTypes.string,
};

Template.defaultProps = {
  template: null,
  pageTitle: null,
};

function mapStatesToProps(state) {
  return {
    template: state.core.route.view.template.key,
    pageTitle: state.core.route.view.pageTitle,
  };
}

export default connect(mapStatesToProps)(Template);
