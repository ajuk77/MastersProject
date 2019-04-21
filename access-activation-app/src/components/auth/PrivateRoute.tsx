import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const privateRoute = ({component: Component, accessToken, ...rest}: any) => (
  <Route {...rest}
    render={
      props => accessToken ? (
        <Component {...props}></Component>
      ): <Redirect to={{
        pathname: '/unauthorized',
        state: { from: props.location }
      }}/>
    }
  ></Route>
)

const mapStateToProps = (state: any) => ({
  auth: state.UserReducer
})

export default connect(mapStateToProps)(privateRoute);