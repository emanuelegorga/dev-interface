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

  componentDidMount() {
    const { token, isFetching } = this.props;

    if (isFetching) {
      const headerConfig = {
        headers: { 'Authorization': token }
      }

      try {
        const testCall = axios.get(
          API_URL, headerConfig
        )
          .then((response) => {
            this.setState({
              articles: this.state.articles.concat(response.data.data)
            })
            console.log('articles', this.state.articles);
            // alert('Articles fetched');
          })
      } catch (e) {
        console.error(e)
        alert('There was an issue while fetching the articles')
      }
    }
  }

  // handleListArticles = async (key, event) => {
  //   const { token, isFetching } = this.props;

  //   if (isFetching) {
  //     const headerConfig = {
  //       headers: { 'Authorization': token }
  //     }

  //     try {
  //       const testCall = await axios.get(
  //         API_URL, headerConfig
  //       )
  //         .then((response) => {
  //           this.setState({
  //             articles: this.state.articles.concat(response.data.data)
  //           })
  //           console.log('articles', this.state.articles);
  //           // alert('Articles fetched');
  //         })
  //     } catch (e) {
  //       console.error(e)
  //       alert('There was an issue while fetching the articles')
  //     }
  //   }
  // }

  // componentDidMount() {
  //   const { onLoad } = this.props;

  //   axios('http://localhost:3000/articles')
  //     .then((response) => onLoad(response.data));
  // }

  // TODO: UPDATE COMPONENT WHEN CREATING A NEW ARTICLE
  // TODO: CREATE COOMMEN

  render() {

    return (
      <>
        <h1> Articles: </h1>

        {/* <button
          onClick={this.handleListArticles}
          className="btn btn-primary float-right">
          List all articles
        </button> */}

        {this.state.articles.map(article => (
          <div key={article.id} className="col-12 offset-lg-3">
            <h3>Article n. {article.attributes.id}</h3>
            <h4>Title: {article.attributes.title}</h4>
            <p>Description: {article.attributes.content}</p>
            <p>Author: {article.attributes.slug}</p>
          </div>
        ))}
      </>
    )
  }
}

export default ListArticle;
