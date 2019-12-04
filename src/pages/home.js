import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Post from "../components/Post";
import jwtDecode from "jwt-decode";
import Profile from "../components/Profile";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

import PropTypes from "prop-types";

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const {
      data: { posts, loading }
    } = this.props;
    let loadingMessage = !loading ? "Network Error" : "Loading...";

    let postsMarkup =
      posts.length > 0 && !loading ? (
        posts.map(post => {
          return <Post post={post} />;
        })
      ) : (
        <p>{loadingMessage}</p>
      );
    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {postsMarkup}
          <p></p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
home.propTypes = {
  data: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);
