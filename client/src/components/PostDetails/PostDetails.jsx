import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
// MATERIAL UI
import { Typography, CircularProgress, Divider } from "@mui/material";
// STYLED COMP
import {
  StyledPaper,
  PostCardStyled,
  ImageSectionStyled,
  ImageMediaStyled,
  SectionDetailsStyled,
  RecommendedPostsStyled,
  SingleRecommendedPostStyled,
  LoadingPaperStyled,
} from "./styled";
// COMPONENTS
import CommentSection from "./CommentSection";
// ACTIONS
// import { getPost, getPostsBySearch } from "../../actions/posts";
import {
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../../constants/actionType";
import * as api from "../../api";

import { Store } from "../../Store";

function PostDetails() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { posts, isLoading, post } = state;
  // USE NAVIGATE
  const navigate = useNavigate();
  // USE PARAMS
  const { id } = useParams();

  // FETCH DATA
  useEffect(() => {
    // ctxDispatch(getPost(id));
    takePost();
  }, [id]);

  useEffect(() => {
    if (post) {
      // ctxDispatch(
      //   getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      // );
      takePostsBySearch();
    }
  }, [post]);

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

  const takePostsBySearch = async () => {
    try {
      ctxDispatch({ type: START_LOADING });
      const {
        data: { data },
      } = await api.fetchPostsBySearch({
        search: "none",
        tags: post?.tags.join(","),
      });

      ctxDispatch({ type: FETCH_BY_SEARCH, payload: data });
      ctxDispatch({ type: END_LOADING });
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
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

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
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
          </SectionDetailsStyled>
        </PostCardStyled>
        {recommendedPosts.length && (
          <SectionDetailsStyled>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <RecommendedPostsStyled>
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
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" />
                  </SingleRecommendedPostStyled>
                )
              )}
            </RecommendedPostsStyled>
          </SectionDetailsStyled>
        )}
      </StyledPaper>
      <StyledPaper elevation={6}>
        <CommentSection post={post} />
      </StyledPaper>
    </>
  );
}

export default PostDetails;
