import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchArticle, deleteArticle } from '../../modules/articles';

class Show extends Component {
  // definition
  static propTypes = {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
      error: PropTypes.string,
    }),
    dispatch: PropTypes.func,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // lifecycle
  componentWillMount() {
    const { articles, dispatch, params } = this.props;
    const article = articles.list.find(a => a.id === params.id);
    if (!article) dispatch(fetchArticle(params.id));
  }

  handleDelete() {
    const { dispatch, params } = this.props;
    dispatch(deleteArticle(params.id))
    .then(() => {
      dispatch(push('/'));
    })
    .catch(error => this.setState({ error }));
  }

  // Renders
  render() {
    const { articles, params } = this.props;
    const article = articles.list.find(a => a.id === params.id) || {};
    if (!article.tags) article.tags = [];
    const tags = article.tags.reduce((sum, tag) => `${sum} ${tag},`, '').slice(0, -1);
    return (
      <div className="articleShow">
        <div className="articleAuthor">{article.author} - {article.title}</div>
        <div className="articleContent">
          <p className="articleTags">Tags: {tags}</p>
          <p>{article.content}</p>
        </div>
        <button
          onClick={this.handleDelete}
          className="deleteButton"
        >
          Delete
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(Show);
