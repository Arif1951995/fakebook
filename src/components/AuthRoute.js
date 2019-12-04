import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authonticated, ...rest }) => {
  console.log(authonticated);
  return (
    <Route
      {...rest}
      render={props =>
        authonticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
AuthRoute.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  authonticated: state.user.authonticated
})



export default connect(mapStateToProps)(AuthRoute);
