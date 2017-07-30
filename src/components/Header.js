import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({ title }) => (
  <header>
    <h2 className="pageTitle"><Link to="/">{title}</Link></h2>
    <p className="newArticle"><Link to="/new">Create new article</Link></p>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
