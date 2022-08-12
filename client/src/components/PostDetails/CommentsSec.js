import React, { useState, useEffect, useRef, useContext } from "react";
// MATERIAL UI
import {
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Avatar,
} from "@mui/material";
import { CommentInnerDivStyled, CommentOuterDivStyled } from "./styled";
import Comment from "./Comment";
// ACTIONS
// import { commentPost } from "../../actions/posts";
import { START_LOADING, END_LOADING } from "../../constants/actionType";
import * as api from "../../api";

import { Store } from "../../Store";

const CommentSec = ({ post, comments }) => {
  // USE CONTEXT
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData } = state;
  const user = authData.result;
  // USE REF
  const commentsRef = useRef();
  // USE STATE
//   const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

//   useEffect(() => {
//     // if (page) {
//       // ctxDispatch(getPosts(page));
//       takeComments();
//     // }
//   }, []);


//   const takeComments = async () => {
//     try {
//       ctxDispatch({ type: START_LOADING });
//       const { data } = await api.getComments(post._id);
//       // console.log(data)

//       ctxDispatch({ type: "GET_ALL_COMMENTS", payload: data });
//       ctxDispatch({ type: END_LOADING });
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
  
  const createComment = async () => {
    try {
        ctxDispatch({ type: START_LOADING });
        const { newComment } = await api.createComment({description: comment,author: user._id, jimHelper: user.name, post: post._id});
        // console.log(data)
  
        ctxDispatch({ type: "CREATE_COMMENT", payload: newComment });
        ctxDispatch({ type: END_LOADING });
      } catch (err) {
        console.log(err.message);
      }
  }

//   // COMMENT HANDLER
//   const handleClick = async () => {
//     const finalComment = `${user.result.name}: ${comment}`;

//     // const newComments = await ctxDispatch(commentPost(finalComment, post._id));
//     try {
//       const { data } = await api.comment(finalComment, post._id);
//       ctxDispatch({ type: COMMENT, payload: data });

//       const newComments = data.comments;
//       setComments(newComments);
//     } catch (error) {
//       console.log(error);
//     }

//     setComment("");

//     commentsRef.current.scrollIntoView({ behavior: "smooth" });
//   };

  return (
    <CommentOuterDivStyled>
      <CommentInnerDivStyled>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.length > 0 ? (comments.map((com) => (
        //   <Comment key={com._id} c={c} />
          <Card key={com._id}>
            <CardHeader
              avatar={<Avatar aria-label="recipe">{com.jimHelper[0]}</Avatar>}
              title={com.jimHelper}
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {com.description}
              </Typography>
            </CardContent>
          </Card>
        ))) : <Typography>No Comments! Write the first one!</Typography>}
        <div ref={commentsRef} />
      </CommentInnerDivStyled>
      {user?.name && (
        <div style={{ width: "60%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
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
      )}
    </CommentOuterDivStyled>
  );
};

export default CommentSec;
