import React, { Component } from 'react';
import { browserHistory, Router, Route } from 'react-router'


import { auth } from '../containers/auth'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={auth.login} />
      </Router>
    );
  }
}

export default App;
