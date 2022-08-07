import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  COMMENT,
  LIKE,
} from "../constants/actionType";

import * as api from "../api";

// Action Creators

export const getPost = (id) => async (ctxDispatch) => {
  try {
    ctxDispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);

    // console.log(data)

    ctxDispatch({ type: FETCH_POST, payload: data });
    ctxDispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

export const getPosts = (page) => async (ctxDispatch) => {
  try {
    ctxDispatch({ type: START_LOADING });
    console.log("Tykali e 1")
    const { data } = await api.fetchPosts(page);

    // console.log(data)

    ctxDispatch({ type: FETCH_ALL, payload: data });
    ctxDispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (ctxDispatch) => {
  try {
    ctxDispatch({ type: START_LOADING });
    console.log("Tykali e 2")

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log("Tykali e 3")


    ctxDispatch({ type: FETCH_BY_SEARCH, payload: data });
    ctxDispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate) => async (ctxDispatch) => {
  try {
    ctxDispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);

    navigate(`/posts/${data._id}`);

    ctxDispatch({ type: CREATE, payload: data });
    ctxDispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post, navigate) => async (ctxDispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    navigate(`/posts/${data._id}`);
    ctxDispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (ctxDispatch) => {
  try {
    console.log(id);
    await api.deletePost(id);

    ctxDispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (ctxDispatch) => {
  try {
    const { data } = await api.likePost(id);

    ctxDispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const commentPost = (value, id) => async (ctxDispatch) => {
  try {
    const { data } = await api.comment(value, id);

    ctxDispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
