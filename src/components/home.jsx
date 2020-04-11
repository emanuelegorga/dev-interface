import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Home extends Component {
  render() {
    const styles = {
      homepageHeader: {
        marginTop: "5vh"
      },
      linksContainer: {
        color: "red",
        display: "flex",
        flexDirection: "column",
        marginTop: "8vh"
      },
      homepageLink: {
        marginBottom: "4vh",
      },
    };

    return (
      <div className="container">
        <div className="row pt5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 style={styles.homepageHeader} className="text-center">DevBlog</h1>
            <div className="text-center" style={styles.linksContainer}>
              <NavLink style={styles.homepageLink} to="/sign_up"> SignUp </NavLink>
              <NavLink style={styles.homepageLink} to="/login"> LogIn </NavLink>
              <NavLink style={styles.homepageLink} to="/articles">Create a new article</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
