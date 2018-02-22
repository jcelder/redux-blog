import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class PostsNew extends Component {
  render() {
    return (
      <div>New Post Goes Here</div>
    )
  }
}

export default reduxForm({
  form: 'PostsNewForm',
})(PostsNew)
