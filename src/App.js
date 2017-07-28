import React, { Component } from 'react';
import request from './request';
import { ARTICLES_QUERY } from './queries';
import Header from './Header';
import Footer from './Footer';
import Article from './Article';

class App extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  // lifecycle
  componentWillMount() {
    request(ARTICLES_QUERY).then(response => {
      this.setState({ articles: response.data.articles });
    });
  }

  // Renders
  render() {
    const articles = this.state.articles.map(a => <Article key={a.id} {...a} />);
    return (
      <div className="App">
        <Header title="Billin code challenge" />
        {articles}
        <Footer />
      </div>
    );
  }
}

export default App;
