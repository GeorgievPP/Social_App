import React, { useState, useRef, useContext } from "react";
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
import { COMMENT } from "../../constants/actionType";
import * as api from "../../api";

import { Store } from "../../Store";

const CommentSection = ({ post }) => {
  // USE CONTEXT
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData } = state;
  const user = authData;
  // USE REF
  const commentsRef = useRef();
  // USE STATE
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  // COMMENT HANDLER
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    // const newComments = await ctxDispatch(commentPost(finalComment, post._id));
    try {
      const { data } = await api.comment(finalComment, post._id);
      ctxDispatch({ type: COMMENT, payload: data });

      const newComments = data.comments;
      setComments(newComments);
    } catch (error) {
      console.log(error);
    }

    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CommentOuterDivStyled>
      <CommentInnerDivStyled>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.map((c, i) => (
          <Comment key={i} c={c} />
          // <Card>
          //   <CardHeader
          //     avatar={<Avatar aria-label="recipe">{c.split(": ")[0][0]}</Avatar>}
          //     title={c.split(": ")[0]}
          //     subheader="September 14, 2016"
          //   />
          //   <CardContent>
          //     <Typography variant="body2" color="text.secondary">
          //       {c.split(":")[1]}
          //     </Typography>
          //   </CardContent>
          // </Card>
        ))}
        <div ref={commentsRef} />
      </CommentInnerDivStyled>
      {user?.result?.name && (
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
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      )}
    </CommentOuterDivStyled>
  );
};

export default CommentSection;
