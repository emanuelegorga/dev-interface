/* eslint-disable */

import React, { Component } from 'react';
import axios from 'axios';
import Comment from "../comment";
import ListComment from "../ListComment";
const API_URL = 'https://dev-articles-api.herokuapp.com/articles';

class ListArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      isFetching: true,
      counter: 0,
      commentsCounter: 0
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({commentsCounter: this.state.commentsCounter + 1 });
  }

  componentDidMount() {
    const { token, isFetching } = this.props;

    if (isFetching) {
      const headerConfig = {
        headers: { Authorization: token },
      };

      try {
        axios.get(API_URL, headerConfig).then((response) => {
          this.setState({
            articles: this.state.articles.concat(response.data.data),
          });
          // console.log("articles", this.state.articles);
          // alert('Articles fetched');
        });
      } catch (e) {
        console.error(e);
        alert("There was an issue while fetching the articles");
      }
    }
  }

  render() {
    const { token, userId } = this.props;

    const styles = {
      container: {
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
      },
      header: {
        textAlign: "center",
        marginBottom: "3vh",
      },
      articles: {
        border: "1px solid black",
        marginBottom: "2vh",
        width: "90%",
        marginRight: "auto",
        marginLeft: "auto",
      }
    };

    return (
      <div style={styles.container}>
        <h1 style={styles.header}> Articles </h1>

        {this.state.articles.map((article) => (
          <div
            style={styles.articles}
            key={article.id}
            className="col-12 offset-lg-3"
          >
            <h3>Article n. {article.attributes.id}</h3>
            <h4>Title: {article.attributes.title}</h4>
            <p>Description: {article.attributes.content}</p>
            <p>Author: {article.attributes.slug}</p>
            <div>
              <Comment
                token={token}
                articleId={article.attributes.id}
                updateState={this.updateState}
                key={this.state.commentsCounter}
              />
              <div className="row pt-5">
                <ListComment
                  key={this.state.commentsCounter}
                  isFetching={true}
                  token={token}
                  articleId={article.attributes.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListArticle;
