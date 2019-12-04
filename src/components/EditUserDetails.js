import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "../components/styles";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { editUserDetails } from "../redux/actions/userActions";
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

class EditUserDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };

  mapUserDetailsToState = credentials => {
    const { bio, website, location } = credentials;

    this.setState({
      bio: bio ? bio : "",
      website: website ? website : "",
      location: location ? location : ""
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.mapUserDetailsToState(this.props.credentials);
  };

  componentDidMount() {
    this.mapUserDetailsToState(this.props.credentials);
  }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const { bio, website, location } = this.state;

    const userDetails = {
      bio,
      website,
      location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Tooltip title="Edit details">
          <IconButton className={classes.button} onClick={this.handleOpen}>
          <Edit  color="primary"  />
        </IconButton>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                label="Bio"
                type="text"
                multiline
                rows="3"
                placeholder="A short bio about your self"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              ></TextField>

              <TextField
                name="website"
                label="Website"
                type="text"
                placeholder="Your personal website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
              <TextField
                name="location"
                label="Location"
                type="text"
                placeholder="Your Location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              ></TextField>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
EditUserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditUserDetails)
);
