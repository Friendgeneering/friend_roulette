import React, { Component } from 'react';
import { browserHistory, Router, Route } from 'react-router'


import { auth } from '../containers/auth'
import { main } from './dashboard'
import Profile from './base/profile'

class App extends Component {
  render() {
  	const requireAuthentication = auth.requireAuthentication
    return (
      <Router history={browserHistory}>
        <Route path='/' component={auth.Login} />
        <Route path='dashboard' component={requireAuthentication(main.Dashboard)} />
        <Route path='/profile/:id' component={Profile} />
      </Router>
    );
  }
}

export default App;
