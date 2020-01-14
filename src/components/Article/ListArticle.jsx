import React, { Component } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:3000/articles';

class ListArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isFetching: true
    }
  }

  handleListArticles = async (key, event) => {
    const { token, isFetching } = this.props;

    if (isFetching) {
      const headerConfig = {
        headers: { 'Authorization': token }
      }

      try {
        const testCall = await axios.get(
          API_URL, headerConfig
        )
          .then((response) => {
            this.setState({
              articles: this.state.articles.concat(response.data.data)
            })
            console.log('articles', this.state.articles);
            alert('Articles fetched');
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
        {this.state.articles.map(article => (
          <div key={article.id} className="col-12 offset-lg-3">
            <p>{article.attributes.title}</p>
          </div>
        ))}
      </>
    )
  }
}

export default ListArticle;
