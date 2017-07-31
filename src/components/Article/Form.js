import React, { PropTypes } from 'react';

const Form = ({ article, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      Author:
      <input
        type="text"
        name="author"
        value={article.author}
        onChange={onChange}
      />
    </label>
    <label>
      Title:
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={onChange}
      />
    </label>
    <label>
      Content:
      <textarea
        name="content"
        value={article.content}
        onChange={onChange}
      />
    </label>
    <label>
      Tags:
      <input
        type="text"
        name="tags"
        value={article.tags}
        onChange={onChange}
      />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

Form.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    // tags: PropTypes.arrayOf(PropTypes.string), //TODO: Improve handling of tags
    tags: PropTypes.string,
    title: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form;
