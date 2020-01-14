import React, { Component } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:3000/articles';

class ListArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      token: '',
      isFetching: true
    }
  }

  handleListArticles = async (key, event) => {
    const { token, isFetching } = this.props;
    const articles = this.state;

    if (isFetching) {
      console.log(token);

      const headerConfig = {
        headers: { 'Authorization': token }
      }

      try {
        const testCall = await axios.get(
          API_URL, headerConfig
        )
          .then((response) => {
            console.log(response.data)
            alert('Articles fetched')
          })
      } catch (e) {
        console.error(e)
        alert('There was an issue while fetching the articles')
      }
    }

  }

  render() {

    return (
      <>
        <h1> LIST ARTICLES </h1>
        <button
          onClick={this.handleListArticles}
          className="btn btn-primary float-right">
          List all articles
        </button>
      </>
    )
  }
}

export default ListArticle;
