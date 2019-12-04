import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "../components/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/core/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import { uploadImage, logoutUser } from "../redux/actions/userActions";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import dayjs from "dayjs";
import { Tooltip } from "@material-ui/core";
import EditUserDetails from "./EditUserDetails";

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();

    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  hnadleEditPicture = () => {
    document.getElementById("imageInput").click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { website, bio, handle, createdAt, location, imageUrl },
        loading,
        authonticated
      }
    } = this.props;

    
    const profileMarkup = !loading ? (
      authonticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img className="profile-image" src={imageUrl} alt="profile" />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <Tooltip title="Edit Picture">
                <IconButton onClick={this.hnadleEditPicture} className="button">
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography variant="body2"> {bio} </Typography>}
              <hr />
              {location && (
                <>
                  <LocationOnIcon color="primary" /> <span>{location}</span>
                  <hr />
                </>
              )}
              {website && (
                <>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank"></a> {website}
                  <hr />
                </>
              )}
              <CalendarTodayIcon color="primary" />{" "}
              <span>joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>

            <Tooltip title="Logout">
              <IconButton onClick={this.handleLogout} className="button">
                <KeyboardReturn color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <EditUserDetails />
        </Paper>
      ) : (
        <Paper classsName={classes.paper}>
          <Typography variant="body2" align="center">
            No Profile Found. plz login again
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                component={Link}
                to="/signup"
              >
                Signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { uploadImage, logoutUser })(
  withStyles(styles)(Profile)
);
