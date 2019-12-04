import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { postAPost, clearErrors } from "../redux/actions/dataActions";
import { Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Edit from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Close from "@material-ui/icons/Close";
import Add from "@material-ui/icons/Add";

import style from "./styles";

const styles = {
  ...style,
  closeButton: {
    position: "absolute",
    left: "85%",
    top: "10%"
  }
};

class PostAPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
    this.props.clearErrors();
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.postAPost({ body: this.state.body });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
    if (!nextProps.ui.errors && !nextProps.ui.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  render() {
    const { errors } = this.state;
    const {
      classes,
      ui: { loading }
    } = this.props;

    return (
      <Fragment>
        <Tooltip title="Post Your Status">
          <IconButton onClick={this.handleOpen} className="button">
            Post
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <Tooltip title="Close">
            <IconButton
              onClick={this.handleClose}
              className={classes.closeButton}
            >
              <Close />
            </IconButton>
          </Tooltip>
          <DialogTitle>What's Your Status</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post"
                multiline
                rows="3"
                placeholder="Post Your Status"
                error={errors.comment}
                helperText={
                  errors.comment && errors.comment.split("comment ")[1]
                }
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostAPost.propTypes = {
  postAPost: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  ui: state.ui
});

export default connect(mapStateToProps, { postAPost, clearErrors })(
  withStyles(styles)(PostAPost)
);
