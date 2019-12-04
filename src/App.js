import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import Navbar from "./components/Navbar";
import styles from "./components/styles";
import jwtDecode from "jwt-decode";
import AuthRoute from "./components/AuthRoute";
import axios from "axios";

//redux

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHONTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://asia-east2-fakebook-39e52.cloudfunctions.net/api";

const theme = createMuiTheme(styles);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHONTICATED });
    axios.defaults.headers.common["Authorization"] = token;

    store.dispatch(getUserData());
  }

  // authonticated = true;
}

function App() {
  return (
    <Provider store={store}>
      {/* <MuiThemeProvider theme={theme}> */}
      <Router>
        <Navbar />

        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute exact path="/signup" component={signup} />

            <AuthRoute exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
      {/* </MuiThemeProvider> */}
    </Provider>
  );
}

export default App;
