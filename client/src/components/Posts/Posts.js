import React from "react";
import { useSelector } from "react-redux";

// MATERIAL UI
import { Grid, CircularProgress } from "@material-ui/core";

// COMPONENTS
import Post from "./Post/Post";

// STYLES
import useStyles from "./styles";

// POSTS COMPONENT
const Posts = ({ setCurrentId }) => {
  // USE REDUX USE SELECTOR
  const { posts, isLoading } = useSelector((state) => state.posts);

  // USE STYLES
  const classes = useStyles();
  // console.log(posts);

  if (!posts.length && !isLoading) {
    return "No posts";
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
