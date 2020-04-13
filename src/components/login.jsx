import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const API_URL = 'https://dev-articles-api.herokuapp.com/login';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      redirect: false,
      token: "",
      userId: ""
    };

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async () => {
    const { login, password } = this.state;

    const loginRequest = {
      "data": {
        "attributes": {
          "login": login,
          "password": password
        }
      }
    }

    try {
      await axios.post(
        API_URL, loginRequest
      )
        .then((response) => {
          const userId = response.data['data']['id']
          const accessToken = response.data['data']['attributes']['token'];
          this.setState({ redirect: true, token: accessToken, userId: userId });
          alert('Login Successful!')
        })
    } catch (e) {
      console.error(e)
      alert('Username or Password wrong')
    }
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }


  render() {
    const { login, password, redirect, token, userId } = this.state;

    if (redirect) {
      return <Redirect to={{ pathname: "/articles", state: { token: token, userId: userId } }} />
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
                  LogIn
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

export default Login;
