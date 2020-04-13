/* eslint-disable */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
let API_COMMENT_URL = "https://dev-articles-api.herokuapp.com/articles";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleSubmitComment = async (key, event) => {
    const { token, articleId } = this.props;
    const { comment } = this.state;

    let url = eval("`${API_COMMENT_URL}/${articleId}/comments`");

    const headerConfig = {
      headers: { Authorization: token },
    };

    const prepareComment = {
      data: {
        attributes: {
          content: comment
        },
      },
    };

    try {
      await axios
        .post(url, prepareComment, headerConfig)
        .then((response) => {
          // console.log(response.data);
        })
        .then((e) => {
          this.props.updateState;
        })
    } catch (e) {
      console.error(e);
    };
  };

  render() {
    const { comment } = this.state;

    return (
      <div>
        <input
          onChange={(ev) => this.handleChangeField("comment", ev)}
          value={comment}
          type="text"
          placeholder="Add a comment"
          className="form-control my-3"
        />
        <button
          onClick={this.handleSubmitComment}
          className="btn btn-primary float-right"
        >
          Submit Comment
        </button>
        <button
          onClick={this.props.updateState}
          className="btn btn-primary"
        >
          Refresh Comments
        </button>
      </div>
    );
  }
}

export default Comment;
