import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({ title }) => (
  <header>
    <h2 className="pageTitle"><Link to="/">{title}</Link></h2>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
