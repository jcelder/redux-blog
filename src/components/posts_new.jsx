import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { createPost} from '../actions'

class PostsNew extends Component {
  renderField(field) {
    const { meta: { error, touched }} = field
    const className = `form-group ${touched && error ? 'has-danger' : ''}`

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
        className="form-control"
        type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => { this.props.history.push('/') })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        {/* Handle submit handles all the form validation for redux-form
         and then if everything looks good it will then call onSubmit and
          rebind this to the proper scope */}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/">Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Please enter a title!'
  }
  if (!values.categories) {
    errors.categories = 'Please enter a category!'
  }
  if (!values.content) {
    errors.content = 'Please enter the content of your post!'
  }

  // If errors is empty the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: 'PostsNewForm',
})(connect(null, { createPost })(PostsNew))
