import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// MATERIAL UI
import { PaginationItem } from "@mui/material";
// STYLED COMP
import { PaginationStyled } from "./styled";

// ACTIONS
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  // USE REDUX USE SELECTOR
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // FETCH DATA
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

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
