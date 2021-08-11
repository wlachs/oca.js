/* React imports */
import React from 'react';
import './index.css';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MENU_ENTRIES = [
  {
    text: 'Contact',
    link: '/contact',
  },
  {
    text: 'Projects',
    link: '/projects',
  },
];

function TopBarContent() {
  return (
    <div className="col-12 col-lg-10 mx-auto mb-lg-5 d-flex justify-content-between align-items-center">
      <NavLink to="/" className="link">
        <img
          src="/assets/custom/TopBar/logo.svg"
          height="40"
          className="navbar-logo"
          alt="Laszlo Borbely | MSc Student, Front-end & Back-end Developer"
        />
      </NavLink>
      <div className="d-none d-lg-flex w-100 flex-row-reverse align-items-center">
        {
        MENU_ENTRIES.map(({ text, link }) => (
          <NavLink to={link} className="link" activeClassName="link_active" key={link}>
            {text}
          </NavLink>
        ))
      }
      </div>
    </div>
  );
}

TopBarContent.propTypes = {
  // attributes: PropTypes.arrayOf(PropTypes.any),
  // className: PropTypes.string,
};

TopBarContent.defaultProps = {
  // attributes: null,
  // className: '',
};

export default TopBarContent;
