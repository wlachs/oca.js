/* React imports */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/* Redux imports */
import { connect } from 'react-redux';

/* Custom imports */
import getTemplate from '../../custom/config/templates';
import LoadingIndicator from './LoadingIndicator';
import AlertContainer from './AlertContainer';

function Template({ template, pageTitle, loading }) {
  const T = getTemplate(template);
  return (
    <>
      {/* Page title */}
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Display loading indicator */}
      {loading && <LoadingIndicator />}

      {/* Alert */}
      <AlertContainer />

      {/* Render template */}
      <T />
    </>
  );
}

Template.propTypes = {
  template: PropTypes.string,
  pageTitle: PropTypes.string,
  loading: PropTypes.bool,
};

Template.defaultProps = {
  template: '',
  pageTitle: '',
  loading: true,
};

function mapStatesToProps(state) {
  return {
    template: state.core.route.view.template.key,
    pageTitle: state.core.route.view.pageTitle,
    loading: state.core.loading,
  };
}

export default connect(mapStatesToProps)(Template);
