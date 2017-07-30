import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import List from './Article/List';
import { fetchArticles } from '../modules/articles';

class Home extends Component {
  // definition
  static propTypes = {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
      error: PropTypes.string,
    }),
    dispatch: PropTypes.func,
  }
  // lifecycle
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchArticles());
  }

  // Renders
  render() {
    return (
      <div>
        <List articles={this.props.articles.list} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(Home);
