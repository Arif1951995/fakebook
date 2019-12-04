import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import dataReducer from "../redux/reducers/dataReducer";
import { Tooltip } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Chat from "@material-ui/icons/Chat";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Delete from "@material-ui/icons/Delete";
import { deltePost } from '../redux/actions/dataActions'

import DeletePost from './DeletePost';

const styles = {
  card: {
    position: 'relative',
    display: "flex",
    marginBottom: 20
  },
  image: {
    width: 100,
    minWidth: 80,
    borderRadius: '10%',
    margin: '10px 20px',
  
  },

  content: {
    padding: 10,
    objectFit: "cover"
  }
};

class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(like => like.postId === this.props.post.postId)
    )
      return true;
    else return false;
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const { classes } = this.props;
    const {
      body,
      createdAt,
      imageUrl,
      likeCount,
      userHandle,
      postId,
      commentCount,

    } = this.props.post;
    // const { body, userHandle } = this.props.post
    const { authonticated, credentials: { handle } } = this.props.user;
    const likeButton = !authonticated ? (
      <Tooltip title="Like Post">
        <IconButton  className="button">
         <Link to="/login">
         <ThumbUpAltOutlinedIcon color="primary" />
         </Link>
        </IconButton>
      </Tooltip> 
    ) : (
      this.likedPost() ? (<Tooltip title="Unlike Post">
      <IconButton onClick={this.unlikePost} className="button">
        <ThumbUpAltIcon color="primary" />
      </IconButton>
    </Tooltip>) : (<Tooltip title="Like Post">
      <IconButton onClick={this.likePost} className="button">
        <ThumbUpAltOutlinedIcon color="primary" />
      </IconButton>
    </Tooltip>)
      
    );

  const deleteButton = authonticated &&  userHandle === handle ? <DeletePost postId={postId} /> : null; 

    

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={imageUrl}
          title="Profile Image"
        />

        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          
        </CardContent>
      </Card>
    );
  }
}
Post.propTypes = {
  user: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { likePost, unlikePost })(
  withStyles(styles)(Post)
);
