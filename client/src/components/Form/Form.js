import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

// MATERIAL UI
import { Typography } from "@mui/material";
// STYLED COMP
import {
  ButtonClear,
  ButtonSubmit,
  FileDivStyled,
  FormStyled,
  PaperStyled,
  TextFieldStyled,
} from "./styled";

// ACTIONS
import {
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
} from "../../constants/actionType";
import * as api from "../../api";
import { Store } from "../../Store";

// FORM VALIDATION
const postValidation = (postData, setErrors) => {
  let temp = {};
  temp.title =
    postData.title.length > 1 ? "" : "Title Length must be at least 2 chars";
  temp.message =
    postData.message.length >= 3
      ? ""
      : "Message Length must be at least 3 chars";
  temp.tags =
    postData.tags.length > 0 ? "" : "Required! Must add at least 1 category";
  setErrors({
    ...temp,
  });

  return Object.values(temp).every((x) => x === "");
};

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

// FORM COMPONENT
const Form = ({ currentId, setCurrentId }) => {
  // USE CONTEXT
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { authData, posts } = state;
  const user = authData;
  // console.log(posts);
  const post = currentId
    ? posts.find((message) => message._id === currentId)
    : null;
  // USE NAVIGATE
  const navigate = useNavigate();
  // USE STATE
  const [postData, setPostData] = useState(initialState);
  const [errors, setErrors] = useState({});
  // USE EFFECT
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  // FORM HANDLER CREATE AND EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postValidation(postData, setErrors)) {
      return;
    }

    if (currentId === 0) {
      try {
        ctxDispatch({ type: START_LOADING });

        const { data } = await api.createPost({
          ...postData,
          name: user?.result?.name,
        });

        navigate(`/posts/${data._id}`);
        ctxDispatch({ type: CREATE, payload: data });
        ctxDispatch({ type: END_LOADING });
      } catch (err) {
        console.log(err);
      }
      clear();
    } else {
      try {
        const { data } = await api.updatePost(currentId, {
          ...postData,
          name: user?.result?.name,
        });
        navigate(`/posts/${data._id}`);
        ctxDispatch({ type: UPDATE, payload: data });
      } catch (err) {
        console.log(err);
      }
      clear();
    }
  };

  // CLEAR FORM
  const clear = () => {
    setCurrentId(0);
    setPostData(initialState);
  };

  if (!user?.result?.name) {
    return (
      <PaperStyled elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </PaperStyled>
    );
  }

  return (
    <PaperStyled elevation={6}>
      <FormStyled autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating a Post"}
        </Typography>
        <TextFieldStyled
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          {...(errors.title && { error: true, helperText: errors.title })}
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextFieldStyled
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          {...(errors.message && { error: true, helperText: errors.message })}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextFieldStyled
          name="tags"
          variant="outlined"
          label="Category Tags (coma separated)"
          fullWidth
          {...(errors.tags && { error: true, helperText: errors.tags })}
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <FileDivStyled>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </FileDivStyled>
        <ButtonSubmit
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </ButtonSubmit>
        <ButtonClear
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </ButtonClear>
      </FormStyled>
    </PaperStyled>
  );
};

export default Form;
