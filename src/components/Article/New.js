import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createArticle } from '../../modules/articles';

class New extends Component {
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
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    const dispatch = this.props.dispatch;
    event.preventDefault();
    this.props.dispatch(createArticle(this.state))
      .then(article => dispatch(push(`/${article.id}`)))
      .catch(error => this.setState({ error }));
  }

  // Renders
  render() {
    return (
      <div className="articleForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Tags:
            <input
              type="text"
              name="tags"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

export default connect(mapStateToProps)(New);
