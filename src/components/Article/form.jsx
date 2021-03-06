import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ListArticle from './ListArticle';
import axios from 'axios';
const API_URL = 'https://dev-articles-api.herokuapp.com/articles';


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      token: this.props.location.state.token,
      userId: this.props.location.state.userId,
      counter: 0
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmit = async (key, event) => {
    const { title, body, author, token } = this.state;

    const createSlug = (string) => {
      return string.split(" ").join("-");
    }

    const headerConfig = {
      headers: { 'Authorization': token }
    }

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
      await axios.post(
        API_URL, prepareArticle, headerConfig
      )
        .then((response) => {
          // console.log(response.data)
          alert('Article created!')
        })
      this.setState({ counter: this.state.counter + 1 })
    } catch (e) {
      console.error(e)
      alert('Error! The article has not been created.')
    }
  }

  render() {
    const { title, body, author, token, userId } = this.state;

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
                className="btn btn-primary float-right"
              >
                Submit
              </button>
              <NavLink to="/"> Go Back </NavLink>
            </div>
          </div>
        </div>
        <div className="row pt-5">
          <ListArticle key={this.state.counter} isFetching={true} token={token} userId={userId}/>
        </div>
      </>
    );
  }
}

export default Form;
