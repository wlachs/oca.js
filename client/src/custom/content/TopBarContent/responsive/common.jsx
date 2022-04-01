/* React imports */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* Custom imports */
import linkData from '../links.json';

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
  return linkData.links.map(({ text, link }) => (
    <NavLink to={link} key={link} className={({ isActive }) => (isActive ? 'link link_active' : 'link')}>
      {text}
    </NavLink>
  ));
}
