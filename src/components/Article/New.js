import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Form from './Form';
import { createArticle } from '../../modules/articles';
import { changeForm, emptyForm } from '../../modules/form';


class New extends Component {
  // definition
  static propTypes = {
    dispatch: PropTypes.func,
    form: PropTypes.object,
  }
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { dispatch, form } = this.props;
    event.preventDefault();
    const changes = {
      ...form,
      tags: form.tags.split(', '),
    };
    dispatch(createArticle(changes))
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
          article={this.props.form}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <div>{error}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
});

export default connect(mapStateToProps)(New);
