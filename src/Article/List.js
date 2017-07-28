import React, { PropTypes } from 'react';
import Card from './Card';

const List = ({ articles }) => {
  const list = articles.map(a => <Card key={a.id} {...a} />);
  return (
    <div className="articleList">
      {list}
    </div>
  );
};

List.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
};

export default List;
