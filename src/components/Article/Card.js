import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Card = ({ id, title, author, excerpt }) => (
  <div className="articleCard">
    <div className="cardAuthor">
      <Link to={`/${id}`}>{author}</Link>
    </div>
    <div className="cardContent">
      <h3 className="cardTitle">{title}</h3>
      <p>{excerpt}</p>
    </div>
  </div>
);

Card.propTypes = {
  author: PropTypes.string,
  excerpt: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
