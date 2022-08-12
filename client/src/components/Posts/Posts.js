import React, { useContext } from "react";
// MATERIAL UI
import { Grid, CircularProgress, Typography, Divider } from "@mui/material";
import { StyledPaper } from "../PostDetails/styled";
// COMPONENTS
import Post from "./Post/Post";
import { Store } from "../../Store";

// POSTS COMPONENT
const Posts = ({ currentId, setCurrentId }) => {
  const { state } = useContext(Store);
  const { posts, isLoading } = state;

  if (!posts.length && !isLoading) {
    return (
      <StyledPaper style={{ marginTop: "100px", marginLeft: "-18px" }}>
        <Typography variant="h6" color="textSecondary">
          There Are No Posts...
        </Typography>
        <Divider />
      </StyledPaper>
    );
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
