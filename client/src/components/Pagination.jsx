import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// MATERIAL UI
import { Pagination, PaginationItem } from "@material-ui/lab";

// ACTIONS
import { getPosts } from "../actions/posts";

// STYLES
import useStyles from "./styles";

const Paginate = ({ page }) => {
  // USE REDUX USE SELECTOR
  const { numberOfPages } = useSelector((state) => state.posts);
  // USE REDUX
  const dispatch = useDispatch();

  // USE STYLES
  const classes = useStyles();

  // FETCH DATA
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
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
