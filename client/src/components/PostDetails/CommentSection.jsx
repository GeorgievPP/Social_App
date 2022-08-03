import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

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
// ACTIONS
import { commentPost } from "../../actions/posts";
import { CommentInnerDivStyled, CommentOuterDivStyled } from "./styled";
import Comment from "./Comment";

const CommentSection = ({ post }) => {
  // USE REDUX
  const dispatch = useDispatch();

  // USE REF
  const commentsRef = useRef();

  // USE STATE
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("profile"));

  // COMMENT HANDLER
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
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
