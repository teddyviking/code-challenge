import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Form from './Form';
import { editArticle, fetchArticle } from '../../modules/articles';
import { changeForm, emptyForm } from '../../modules/form';

class New extends Component {
  // definition
  static propTypes = {
    articles: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
      error: PropTypes.string,
    }),
    dispatch: PropTypes.func,
    form: PropTypes.object,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { articles, dispatch, params } = this.props;
    const article = articles.list.find(a => a.id === params.id);
    if (!article) {
      return dispatch(fetchArticle(params.id)).then(a => {
        dispatch(changeForm({ ...a, tags: a.tags.join(', ') }));
      });
    }
    return dispatch(changeForm(article));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.dispatch(changeForm({
      [name]: value,
    }));
  }

  handleSubmit(event) {
    const { dispatch, form, params } = this.props;
    event.preventDefault();
    const changes = {
      ...form,
      tags: form.tags.split(', '),
    };
    dispatch(editArticle(params.id, changes))
      .then(article => {
        dispatch(push(`/${article.id}`));
        dispatch(emptyForm());
      })
      .catch(error => this.setState({ error }));
  }

  // Renders
  render() {
    const error = this.state.error ? this.state.error.toString() : '';
    return (
      <div className="articleForm">
        <Form
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          article={this.props.form}
        />
        <div>{error}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
  form: state.form,
});

export default connect(mapStateToProps)(New);
