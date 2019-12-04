import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHONTICATED, LOADING_USER } from "../types";
import axios from "axios";

export const getUserData = () => dispatch => {
  dispatch({type: LOADING_USER})
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationToken(res.data.token);
     
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log(this);
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signupUser = (newUser, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUser)
    .then(res => {
      
      setAuthorizationToken(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      console.log(this);
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

 
export const logoutUser = () => dispatch => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common["Authorization"];
  dispatch({type: SET_UNAUTHONTICATED});
  
}

export const uploadImage = (formData) => dispatch => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => dispatch => {
  dispatch({type: LOADING_USER});
  axios.post('/user', userDetails)
  .then(() => {
    dispatch(getUserData())
  })
  .catch(err => console.err);
  
}


const setAuthorizationToken = (token) => {
  const FBIdToken = `Bearer ${token}`;

      console.log(localStorage.FBIdToken);
      localStorage.setItem("FBIdToken", FBIdToken);
      console.log(localStorage.FBIdToken);

      axios.defaults.headers.common["Authorization"] = FBIdToken;

}
