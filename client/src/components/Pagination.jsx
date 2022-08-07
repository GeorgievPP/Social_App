import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// MATERIAL UI
import { PaginationItem } from "@mui/material";
// STYLED COMP
import { PaginationStyled } from "./styled";
// ACTIONS
// import { getPosts } from "../actions/posts";
import { FETCH_ALL, START_LOADING, END_LOADING } from "../constants/actionType";
import * as api from "../api";
import { Store } from "../Store";

const Paginate = ({ page }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { numberOfPages } = state;

  // FETCH DATA
  useEffect(() => {
    if (page) {
      // ctxDispatch(getPosts(page));
      takePosts();
    }
  }, [page]);

  const takePosts = async () => {
    try {
      ctxDispatch({ type: START_LOADING });
      const { data } = await api.fetchPosts(page);
      // console.log(data)

      ctxDispatch({ type: FETCH_ALL, payload: data });
      ctxDispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <PaginationStyled
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
