import React from "react";
import { useSelector } from "react-redux";

// MATERIAL UI
import { Grid, CircularProgress } from "@mui/material";

// COMPONENTS
import Post from "./Post/Post";

// POSTS COMPONENT
const Posts = ({ setCurrentId }) => {
  // USE REDUX USE SELECTOR
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) {
    return "No posts";
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
