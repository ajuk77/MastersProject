import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from './store/actions/UserActions';

// Routes

import Home from './views/Home';
import Dashboard from './views/Dashboard';

// Components

import Navbar from './components/common/Navbar';

// Icons

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Router>
          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Fragment>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state,
  user: state.userReducers
})

const mapDispatchToProps = (dispatch: any) => ({
  LOGIN_USER: dispatch(loginUser)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
