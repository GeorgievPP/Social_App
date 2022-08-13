import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// MATERIAL UI
import {
  Typography,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
} from "@mui/material";
// STYLED COMP
import {
  StyledPaper,
  PostCardStyled,
  ImageSectionStyled,
  ImageMediaStyled,
  SectionDetailsStyled,
  SingleRecommendedPostStyled,
  LoadingPaperStyled,
  ImageStyled,
} from "./styled";
// COMPONENTS
import { CommentInnerDivStyled, CommentOuterDivStyled } from "./styled";

import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// ACTIONS
import {
  FETCH_POST,
  START_LOADING,
  END_LOADING,
} from "../../constants/actionType";
import * as api from "../../api";

import { Store } from "../../Store";

function PostDetails() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData, searchPosts, isLoading, post, postComments } = state;
  const user = authData.result;

  const [comment, setComment] = useState("");

  // USE NAVIGATE
  const navigate = useNavigate();
  // USE PARAMS
  const { id } = useParams();

  const commentsRef = useRef();

  // FETCH DATA
  useEffect(() => {
    takePost();
  }, [id]);

  // FETCH POST
  const takePost = async () => {
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

  // FETCH COMMENTS
  const takeComments = async () => {
    try {
      ctxDispatch({ type: START_LOADING });
      const data = await api.getComments({ postId: post._id });
      console.log("iee");
      console.log(data);

      ctxDispatch({ type: "GET_ALL_COMMENTS", payload: data });
      ctxDispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err.message);
    }
  };

  // CREATE COMMENT
  const createComment = async () => {
    try {
      ctxDispatch({ type: START_LOADING });
      const { newComment } = await api.createComment({
        description: comment,
        author: user._id,
        jimHelper: user.name,
        avatar: user.imageUrl,
        post: post._id,
      });
      // console.log(data)

      ctxDispatch({ type: "CREATE_COMMENT", payload: newComment });
      ctxDispatch({ type: END_LOADING });
      takeComments();
    } catch (err) {
      console.log(err.message);
    }

    setComment("");
  };

  // DELETE COMMENT
  const deleteComment = async (commentId) => {
    try {
      console.log(id);
      await api.deleteComment(commentId);

      ctxDispatch({ type: "DELETE_COMMENT", payload: commentId });
      takeComments();
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return null;
  }

  if (isLoading) {
    return (
      <LoadingPaperStyled elevation={6}>
        <CircularProgress size="7em" />
      </LoadingPaperStyled>
    );
  }

  // FILTER RECOMMENDED POSTS
  const recommendedPosts = searchPosts.filter(({ _id }) => _id !== post._id);

  // OPEN OTHER POST
  const openPost = (_id) => navigate(`/posts/${_id}`);

  return (
    <>
      <StyledPaper elevation={6}>
        <PostCardStyled>
          <ImageSectionStyled>
            <ImageMediaStyled
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </ImageSectionStyled>
          <SectionDetailsStyled>
            <Typography variant="h3" component="h2">
              <ViewQuiltIcon />
              {post.title}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: "13px", marginBottom: "-8px" }}
              color="textSecondary"
            >
              created by:
            </Typography>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body1" style={{ fontSize: "15px" }}>
              <AccessTimeIcon
                style={{
                  marginBottom: "-2px",
                  marginRight: "3px",
                  width: "16px",
                  height: "16px",
                }}
              />
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              style={{ fontSize: "13px", marginBottom: "-5px" }}
              color="textSecondary"
            >
              <DescriptionIcon style={{ marginBottom: "-3px" }} />
              description:
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
          </SectionDetailsStyled>
        </PostCardStyled>
      </StyledPaper>
      {postComments.length > 0 ? (
        <StyledPaper elevation={6} style={{ paddingBottom: "0px" }}>
          <CommentOuterDivStyled>
            <>
              <CommentInnerDivStyled>
                <Typography gutterBottom variant="h6" color="textSecondary">
                  Comments:
                </Typography>
                {postComments.map((com) => (
                  <Card key={com._id}>
                    <CardHeader
                      avatar={
                        <Avatar alt={com.jimHelper[0]} src={com.avatar} />
                      }
                      title={com.jimHelper}
                      subheader={moment(com.createdAt).fromNow()}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {com.description}
                      </Typography>
                    </CardContent>

                    {(user?._id === com.author ||
                      user?._id === post.creator) && (
                      <Button
                        size="small"
                        style={{ color: "#f50057", marginBottom: "10px" }}
                        onClick={() => deleteComment(com._id)}
                      >
                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                      </Button>
                    )}
                  </Card>
                ))}
                <div ref={commentsRef} />
              </CommentInnerDivStyled>
              <div style={{ width: "40%" }}>
                <Typography gutterBottom variant="h6" color="textSecondary">
                  Write a Comment:
                </Typography>
                <TextField
                  fullWidth
                  minRows={6}
                  variant="outlined"
                  label="Comment"
                  multiline
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  style={{ marginTop: "10px" }}
                  fullWidth
                  disabled={!comment}
                  variant="contained"
                  color="primary"
                  onClick={createComment}
                >
                  Comment
                </Button>
              </div>
            </>
          </CommentOuterDivStyled>
        </StyledPaper>
      ) : (
        <StyledPaper>
          <Typography variant="h6" color="textSecondary">
            No comments! Write the first one!
          </Typography>
          <Divider />
          <div style={{ width: "100%" }}>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              style={{ marginTop: "5px" }}
            >
              Write a Comment:
            </Typography>
            <TextField
              fullWidth
              minRows={2}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={createComment}
            >
              Comment
            </Button>
          </div>
        </StyledPaper>
      )}
      <StyledPaper elevation={6}>
        {recommendedPosts.length > 0 ? (
          <SectionDetailsStyled>
            <Typography gutterBottom variant="h5">
              Posts with the same Category:
            </Typography>
            <Divider />
            <Grid
              container
              alignItems="stretch"
              spacing={2}
              style={{ marginLeft: "50px" }}
            >
              {recommendedPosts.map(
                ({ title, message, name, likes, selectedFile, _id }) => (
                  <SingleRecommendedPostStyled
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message.length > 30
                        ? `${message.substring(0, 20)}...`
                        : message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <ImageStyled src={selectedFile} />
                  </SingleRecommendedPostStyled>
                )
              )}
            </Grid>
          </SectionDetailsStyled>
        ) : (
          <SectionDetailsStyled>
            <Typography gutterBottom variant="h5">
              There are no other posts with the same Category!
            </Typography>
            <Divider />
          </SectionDetailsStyled>
        )}
      </StyledPaper>
    </>
  );
}

export default PostDetails;
