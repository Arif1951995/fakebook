import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_A_POST
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;

      return {
        ...state
      };

    case DELETE_POST:
      let index2 = state.posts.findIndex(
        post => post.postId === action.payload
      );
      state.posts.splice(index2, 1);
      return {
        ...state
      };
    case POST_A_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    default:
      return state;
  }
}
