import React, { PropTypes } from 'react';

const Header = ({ title }) => (
  <div>
    <h2>{title}</h2>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
