import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// MATERIAL UI
import {
  CardContent,
  CardMedia,
  Button,
  Typography,
  Modal,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
// STYLED
import { StyledCard, StyledCardActions, CreatorActions } from "./styled";
// COMPONENTS
import { Likes } from "./Likes";
import { BoxPop } from "../../Home/styled.js";
import Form from "../../Form/Form";
// ACTIONS
import { DELETE, LIKE } from "../../../constants/actionType";
import * as api from "../../../api";
import { Store } from "../../../Store";

// POST COMPONENT
const Post = ({ post, currentId, setCurrentId }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData } = state;
  const user = authData;
  // USE NAVIGATION
  const navigate = useNavigate();
  // USE STATE
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  // Modal Edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  // Modal Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // LIKE HANDLER
  const handleLike = async () => {
    try {
      const { data } = await api.likePost(post._id);

      ctxDispatch({ type: LIKE, payload: data });
    } catch (err) {
      console.log(err);
    }

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  // DELETE POST
  const deleteHandler = async (id) => {
    try {
      console.log(id);
      await api.deletePost(id);

      ctxDispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
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
        <Typography variant="body2" color="textSecondary" component="p">
          {post.tags.map((tag) => `#${tag} `)}
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
                handleOpenEdit();
              }}
              style={{ color: "#14a37f", marginBottom: "10px" }}
              size="small"
            >
              <EditIcon fontSize="small" /> &nbsp; Edit
            </Button>
            <Modal open={openEdit} onClose={handleCloseEdit}>
              <BoxPop>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </BoxPop>
            </Modal>
            <Button
              size="small"
              style={{ color: "#f50057" }}
              onClick={() => handleOpenDelete()}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
            <Modal open={openDelete} onClose={handleCloseDelete}>
              <BoxPop>
                <Paper>

                  <Typography>You Will Delete Post "{`${post.title}`}"!</Typography>
                <Button size="small" style={{ color: "#f50057" }} onClick={() => deleteHandler(post._id)}>
                  <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>
                <Button onClick={handleCloseDelete}>
                  <CancelPresentationIcon fontSize="small" /> &nbsp; NO! Cancel
                </Button>
                </Paper>
              </BoxPop>
            </Modal>
          </CreatorActions>
        )}
      </StyledCardActions>
    </StyledCard>
  );
};

export default Post;
