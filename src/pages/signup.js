import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import icon from "../images/favicon.jpg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../components/styles";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

class signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {}
  };
  hadleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const { email, password, confirmPassword, handle } = this.state;
    this.props.signupUser(
      { email, password, confirmPassword, handle },
      this.props.history
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.ui.errors) {
      this.setState({ errors: nextProps.ui.errors });
    }
  }

  render() {
    const {
      classes,
      ui: { loading }
    } = this.props;
    const { errors } = this.state;
    console.log(errors);

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={icon} alt="icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.hadleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              helperText={errors.email}
              error={errors.email}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              helperText={errors.password}
              error={errors.password}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="confirmPassword"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="User Name"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              helperText={errors.handle}
              error={errors.handle}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.error}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  color="secondary"
                  size={20}
                  className={classes.progress}
                />
              ) : (
                "Signup"
              )}
            </Button>
            <small>
              <br />
              already have a account login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
