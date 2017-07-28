import React, { PropTypes } from 'react';

const Article = ({ title, author, excerpt }) => (
  <div>
    <div>{title}</div>
    <div>
      <p>{author}</p>
      <p>{excerpt}</p>
    </div>
  </div>
);

Article.propTypes = {
  author: PropTypes.string,
  excerpt: PropTypes.string,
  title: PropTypes.string,
};

export default Article;
