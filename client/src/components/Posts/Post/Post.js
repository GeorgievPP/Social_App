import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// ACTIONS
import { deletePost, likePost } from "../../../actions/posts";
// MATERIAL UI
import {
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// STYLED
import {StyledCard, StyledCardActions, CreatorActions} from "./styled"
// COMPONENTS
import { Likes } from "./Likes";

// POST COMPONENT
const Post = ({ post, setCurrentId }) => {
  // USE REDUX
  const dispatch = useDispatch();
  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("profile"));
  // USE NAVIGATION
  const navigate = useNavigate();

  // USE STATE
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  // LIKE HANDLER
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  // OPEN POST
  const openPost = (e) => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <StyledCard>
      <CardMedia
        onClick={openPost}
        component="img"
        height="140"
        style={{ cursor: "pointer" }}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.name}
        </Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <StyledCardActions>
        <Button
          size="small"
          style={{ color: "#1769aa" }}
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes likes={likes} userId={userId} />
        </Button>
        {user?.result?._id === post?.creator && (
          <CreatorActions>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: "#14a37f", marginBottom: "10px" }}
              size="small"
            >
              <EditIcon fontSize="small" /> &nbsp; Edit
            </Button>
            <Button
              size="small"
              style={{ color: "#f50057" }}
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          </CreatorActions>
        )}
      </StyledCardActions>
    </StyledCard>
  );
};

export default Post;
