import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row pt5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">DevBlog</h1>
            <NavLink to="/sign_up"> SignUp </NavLink>
            <NavLink to="/login"> LogIn </NavLink>
            <NavLink to="/articles">Create a new article</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
