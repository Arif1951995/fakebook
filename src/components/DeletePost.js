import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import dataReducer from "../redux/reducers/dataReducer";
import { Tooltip } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "@material-ui/core/Button";

const styles = {
    deleteButton: {
            position: 'absolute',
            left: '85%',
            top: '10%'
    }

}

 class DeletePost extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({open: true});
        console.log('clicked')
    }
    handleClose = () => {
        this.setState({open: false});
    }
    deletePost = () => {
        this.props.deletePost(this.props.postId);
        this.setState({open: false});

    }

    render() {
        const  { classes } = this.props;
        return (
            <Fragment>
                 <Tooltip title="Delete Post" className={classes.deleteButton}>
                <IconButton onClick={this.handleOpen} >
                  <Delete  color="primary" />
                </IconButton>
              </Tooltip>
              <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              fullWidth
              maxWidth="sm"
              >
                  <DialogTitle>
                      Are You Sure You Want to Delete the Post
                  </DialogTitle>
                  <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={this.deletePost} color="primary">
                          Delete
                      </Button>
                  </DialogActions>

              </Dialog>
            </Fragment>
        )
    }
}
DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
  };


export default  connect(null, { deletePost })(withStyles(styles)(DeletePost))
