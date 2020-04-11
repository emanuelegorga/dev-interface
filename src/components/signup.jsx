import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
const API_URL = 'http://localhost:3000/sign_up';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      redirect: false
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async () => {
    const { login, password } = this.state;

    const signUpRequest = {
      "data": {
        "attributes": {
          "login": login,
          "password": password
        }
      }
    }

    try {
      await axios.post(
        API_URL, signUpRequest
      )
        .then((response) => {
          alert('New user created!')
          this.setState({ redirect: true });
        })
    } catch (e) {
      console.error(e)
      alert('Error creating a new user!')
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  render() {
    const { login, password, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <div className="container">
          <div className="row pt5">
            <div className="col-12 col-lg-6 offset-lg-3">
              <h1 className="text-center">DevBlog</h1>
              <div className="col-12 col-lg-6 offset-lg-3">
                <input
                  onChange={(ev) => this.handleChangeField('login', ev)}
                  value={login}
                  className="form-control my-3"
                  placeholder="Username" />
                <input
                  onChange={(ev) => this.handleChangeField('password', ev)}
                  value={password}
                  className="form-control my-3"
                  placeholder="Password" />
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-primary float-right">
                  Sign Up
                </button>
                <NavLink to="/"> Go Back </NavLink>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
