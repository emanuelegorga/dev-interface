import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'http://localhost:3000/articles';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit(key, event) {
    const { title, body, author } = this.state;

    // const prepareArticle = {}

    return axios.post(API_URL, {
      title,
      body,
      author
    });
  }

  render() {
    const { title, body, author } = this.state;

    return (
      <div className="container">
        <div className="row pt5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">DevBlog</h1>
          </div>
          <div className="col-12 col-lg-6 offset-lg-3">
            <input
              onChange={(ev) => this.handleChangeField('title', ev)}
              value={title}
              placeholder="Article Title"
              className="form-control my-3" />
            <textarea
              onChange={(ev) => this.handleChangeField('body', ev)}
              value={body}
              placeholder="Article Description"
              className="form-control my-3">
            </textarea>
            <input
              onChange={(ev) => this.handleChangeField('author', ev)}
              value={author}
              className="form-control my-3"
              placeholder="Article Author" />
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary float-right">
              Submit
            </button>
            <NavLink to="/"> Go Back </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
