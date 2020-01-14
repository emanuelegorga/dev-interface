import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { ListArticle } from './ListArticle';
import { connet } from 'react-redux';
import axios from 'axios';
import ListArticle from './ListArticle';
const API_URL = 'http://localhost:3000/articles';


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      token: this.props.location.state.token
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:3000/articles')
      .then((response) => onLoad(response.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit = async (key, event) => {
    const { title, body, author, token, articles } = this.state;
    console.log(token)

    const createSlug = (string) => {
      return string.split(" ").join("-");
    }

    const headerConfig = {
      headers: { 'Authorization': token }
    }
    console.log(headerConfig)

    const prepareArticle = {
      "data": {
        "attributes": {
          "content": body,
          "title": title,
          "slug": createSlug(title)
        }
      }
    }

    try {
      const newArticle = await axios.post(
        API_URL, prepareArticle, headerConfig
      )
        .then((response) => {
          console.log(response.data)
          alert('Article created!')
        })
    } catch (e) {
      console.error(e)
      alert('Error! The article has not been created.')
    }
  }

  render() {
    const { title, body, author, token } = this.state;

    return (
      <>
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
        <div className="row pt-5">
          <ListArticle isFetching={true} token={token} />
        </div>
      </>
    );
  }
}

export default Form;
