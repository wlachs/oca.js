/* React imports */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Custom imports */
import { links as MENU_ENTRIES } from '../links.json';

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

export function Links() {
  return MENU_ENTRIES.map(({ text, link }) => (
    <NavLink to={link} className="link" activeClassName="link_active" key={link}>
      {text}
    </NavLink>
  ));
}
