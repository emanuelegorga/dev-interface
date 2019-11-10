import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Article from './components/Article/form';
import SignUp from './components/signup'
import Login from './components/login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/articles" component={Article} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
