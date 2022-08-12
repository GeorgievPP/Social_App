import { createContext, useReducer } from "react";

import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_BY_EMAIL,
  FETCH_POST,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  AUTH,
  LOGOUT,
} from "./constants/actionType";

export const Store = createContext();

const initialState = {
  authData: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,

  posts: [],
  postsEmail: [],
  postComments: [],
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_BY_EMAIL:
      return {
        ...state,
        postsEmail: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload.post,
        searchPosts: action.payload.searchPosts,
        postComments: action.payload.postComments
      };
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case "GET_ALL_COMMENTS":
      return {
        ...state,
        postComments: action.payload.data,
      };
    case "CREATE_COMMENT":
      return { ...state, postComments: [...state.postComments, action.payload] };
      case "DELETE_COMMENT":
      return {
        ...state,
        postComments: state.postComments.filter((com) => com._id !== action.payload),
      };
    // case COMMENT:
    //   return {
    //     ...state,
    //     posts: state.posts.map((post) => {
    //       if (post._id === action.payload._id) {
    //         return action.payload;
    //       }

    //       return post;
    //     }),
    //   };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
