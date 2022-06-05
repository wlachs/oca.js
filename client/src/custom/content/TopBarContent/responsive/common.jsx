/* React imports */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export function LogoLink() {
  return (
    <NavLink to="/" className="link">
      <img
        src="/assets/custom/TopBar/logo.svg"
        height="40"
        className="navbar-logo"
        alt="Laszlo Borbely | Software Systems Engineering M.Sc."
      />
    </NavLink>
  );
}

export function Links({ links }) {
  return links.map(({ key, value }) => (
    <NavLink to={value} key={value} className={({ isActive }) => (isActive ? 'link link_active' : 'link')}>
      {key}
    </NavLink>
  ));
}

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
};

Links.defaultProps = {
  links: [],
};
