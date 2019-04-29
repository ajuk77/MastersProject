import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './store/actions/UserActions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faChevronCircleRight, faSync } from '@fortawesome/free-solid-svg-icons';
// Routes

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import { AppLogin } from './views/Login';
// Components

import Navbar from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { RegisterEmployee } from './views/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import unauthorized from './views/Unauthorized';
import UserProfile from './views/UserProfile';
import ValidateID from "./components/auth/ValidateID";


// Icons
library.add(
  faUserCircle,
  faChevronCircleRight,
    faSync
)

interface IAppProps{
  loginUser?: any;
  auth?: any;
  UserReducers?: any;
}

interface IAppState{}

class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <Router>
          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/unauthorized" exact component={unauthorized} />
            <Route path="/login" exact component={AppLogin} />
            <Route path="/register" exact component={RegisterEmployee} />
            <PrivateRoute path="/dashboard" accessToken={this.props.auth.accessToken} exact component={Dashboard}/>
            <PrivateRoute path="/profile" accessToken={this.props.auth.accessToken} exact component={UserProfile}/>
            <PrivateRoute path="/validate" accessToken={this.props.auth.accessToken} exact component={ValidateID}/>
          </Fragment>
        </Router>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state,
    auth: state.UserReducer
  }
}

export default connect(mapStateToProps)(App);
