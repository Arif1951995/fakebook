import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHONTICATED,
  SET_UNAUTHONTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST
} from "../types";

const initialState = {
  authonticated: false,
  credentials: {},
  loading: false,
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHONTICATED:
      return {
        ...state,
        authonticated: true
      };
    case SET_UNAUTHONTICATED:
      return initialState;
    case SET_USER:

      return {
        authonticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            postId: action.payload.postId
          }
        ]
      };

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId !== action.payload.postId)
      };
    default:
      return state;
  }
}
