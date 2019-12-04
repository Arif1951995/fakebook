import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";

import Button from "@material-ui/core/Button";

import { connect } from 'react-redux';
import PropTypes from "prop-types";

import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";
import PostAPost from "./PostAPost";




class Navbar extends Component {
  state = {
    authanticated: localStorage.FBIdToken ? true : false
  };
  render() {
    const { authanticated } = this.props;

    return (
      <AppBar className="AppBar">
        <ToolBar className="nav-container">
           {authanticated ? (
             <Fragment>
               
              <PostAPost />
              <Link to="/">
              <Tooltip title="home page">
              <IconButton onClick={this.handleLogout} className="button">
                
                Home
              </IconButton>
              </Tooltip>
              </Link>
              
              

             </Fragment>
           ) : (
 <Fragment>
   <Button color="inherit" component={Link} to={"/login"}>
 Login
</Button>


<Button color="inherit" component={Link} to="/">
Home
</Button>

<Button color="inherit" component={Link} to="/signup">
 Signup
</Button>
 </Fragment>

           )}
          
           
        </ToolBar>
      </AppBar>
    );
  }
}
Navbar.propTypes = {
  authanticated: PropTypes.bool.isRequired,
  
};

const mapStateToProps = state => ({
  authanticated: state.user.authonticated
})



export default  connect(mapStateToProps)(Navbar);
