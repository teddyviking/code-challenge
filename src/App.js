import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import List from './Article/List';
import { getArticles } from './modules/articles';

class App extends Component {
  // definition
  static propTypes = {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
      error: PropTypes.string,
    }),
    dispatch: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  // lifecycle
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getArticles());
  }

  // Renders
  render() {
    return (
      <div className="App">
        <Header title="Billin code challenge" />
        <List articles={this.props.articles.list} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(App);
