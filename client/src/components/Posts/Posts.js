import React, { useContext } from "react";
// MATERIAL UI
import { Grid, CircularProgress } from "@mui/material";
// COMPONENTS
import Post from "./Post/Post";
import { Store } from "../../Store";

// POSTS COMPONENT
const Posts = ({ currentId, setCurrentId }) => {
  const { state } = useContext(Store);
  const { posts, isLoading } = state;

  if (!posts.length && !isLoading) {
    return "No posts";
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
