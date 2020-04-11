import React, { Component } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:3000/articles";

class ListComment extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: [],
      isFetching: true,
      counter: 0
    };
  }

  componentDidMount() {
    const { token, isFetching, articleId } = this.props;
    let url = eval("`${API_URL}/${articleId}/comments`");

    if (isFetching) {
      const headerConfig = {
        headers: { Authorization: token }
      };

      try {
        axios.get(url, headerConfig).then((response) => {
          this.setState({
            comments: this.state.comments.concat(response.data.data),
          });
          // console.log("comments", this.state.comments);
        });
      } catch (e) {
        console.error(e);
        alert("There was an issue while fetching the comments")
      }
    }
  }

  render() {
    const styles = {
      comment: {
        padding: "20px",
        paddingTop: "5px"
      }
    }

    return (
      <div>
        {this.state.comments.map((comment) => (
          <div style={styles.comment} key={comment.id}>
            <li>{comment.attributes.content}</li>
          </div>
        ))}
      </div>
    );
  }
}

export default ListComment;
