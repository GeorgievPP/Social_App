import React, { useContext, useEffect, useState } from "react";

// MATERIAL UI
import {
  Grid,
  Container,
  CircularProgress,
  Grow,
  CardContent,
  CardMedia,
  Typography,
  Divider,
} from "@mui/material";
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import { StyledPaper } from "./PostDetails/styled";
// COMPONENTS
import PostProfile from "./Posts/Post/PostProfile";
import { Store } from "../Store";

import {
  FETCH_BY_EMAIL,
  START_LOADING,
  END_LOADING,
} from "../constants/actionType";
import * as api from "../api";
import { StyledCard } from "./styled";

const EmailPosts = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData, postsEmail, isLoading } = state;
  const user = authData.result;

  // USE STATE
  const [currentId, setCurrentId] = useState(null);
  const [currentIdd, setCurrentIdd] = useState(1);

  // FETCH DATA
  useEffect(() => {
    takePosts();
  }, [currentIdd]);

  // FETCH POSTS BY USER
  const takePosts = async () => {
    try {
      ctxDispatch({ type: START_LOADING });
      const { data } = await api.fetchPostsByEmail(user);
      console.log(data);

      ctxDispatch({ type: FETCH_BY_EMAIL, payload: data });
      ctxDispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err.message);
    }
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Grid container alignItems="stretch" spacing={3}>
              {postsEmail.length > 0 ? (
                <>
                  {postsEmail.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                      <PostProfile
                        post={post}
                        currentId={currentId}
                        currentIdd={currentIdd}
                        setCurrentIdd={setCurrentIdd}
                        setCurrentId={setCurrentId}
                      />
                    </Grid>
                  ))}
                </>
              ) : (
                <StyledPaper style={{marginTop: "100px", marginLeft: "300px"}}>
                  <Typography variant="h6" color="textSecondary">
                    You have no post added yet...
                  </Typography>
                  <Divider />
                </StyledPaper>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3} style={{marginBottom: "247px"}}>
            <StyledCard>
              <CardMedia
                component="img"
                height="140"
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  verticalAlign: "middle",
                  width: "150px",
                  height: "150px",
                  marginLeft: "51px",
                  marginTop: "20px",
                }}
                image={
                  user.imageUrl ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
                alt="green iguana"
              />
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "100px",
                  paddingLeft: "12px",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <LocalPostOfficeIcon style={{marginBottom: "-5px"}} /> Number of Posts {postsEmail.length}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default EmailPosts;
