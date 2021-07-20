/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

function TemplatePopulator({ template, content }) {
  return (
    <div>
      {JSON.stringify(template)}
      {JSON.stringify(content)}
    </div>
  );
}

TemplatePopulator.propTypes = {
  template: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default TemplatePopulator;
