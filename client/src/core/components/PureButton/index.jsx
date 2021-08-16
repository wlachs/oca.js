/* React imports */
import React from 'react';
import PropTypes from 'prop-types';

/* Custom imports */
import './index.css';
import { NavLink } from 'react-router-dom';

function PureButton(props) {
  const { to, children, onClick } = props;

  if (to) {
    return (
      <NavLink to={to} className="button-link link" onClick={onClick}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type="button" className="button-link link" onClick={onClick}>
      {children}
    </button>
  );
}

PureButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.object, PropTypes.element],
  ).isRequired,
  onClick: PropTypes.func,
};

PureButton.defaultProps = {
  to: null,
  onClick: null,
};

export default PureButton;
