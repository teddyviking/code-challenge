import React, { PropTypes } from 'react';

const Card = ({ title, author, excerpt }) => (
  <div className="articleCard">
    <div className="cardAuthor">{author}</div>
    <div className="cardContent">
      <h3 className="cardTitle">{title}</h3>
      <p>{excerpt}</p>
    </div>
  </div>
);

Card.propTypes = {
  author: PropTypes.string,
  excerpt: PropTypes.string,
  title: PropTypes.string,
};

export default Card;
