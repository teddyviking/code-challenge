import React, { PropTypes } from 'react';

const Header = ({ title }) => (
  <header>
    <h2>{title}</h2>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
