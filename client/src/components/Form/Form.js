import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileBase from "react-file-base64";

// MATERIAL UI
import { Typography } from "@mui/material";
// import ChipInput from "material-ui-chip-input";
// STYLED COMP
import {
  ButtonClear,
  ButtonSubmit,
  FileDivStyled,
  FormStyled,
  PaperStyled,
  TextFieldStyled,
} from "./styles";

// ACTIONS
import { createPost, updatePost } from "../../actions/posts";

const initialState = {
  title: "",
  message: "",
  tags: [],
  selectedFile: "",
};

// FORM COMPONENT
const Form = ({ currentId, setCurrentId }) => {
  // USE STATE
  const [postData, setPostData] = useState(initialState);
  // USE NAVIGATE
  const navigate = useNavigate();
  // USE REDUX USE SELECTOR
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  console.log(post);

  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("profile"));

  // USE EFFECT
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  // FORM HANDLER CREATE AND EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name }, navigate)
      );
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

  // const handleAddChip = (tag) => {
  //   setPostData({ ...postData, tags: [...postData.tags, tag] });
  // };

  // const handleDeleteChip = (chipToDelete) => {
  //   setPostData({
  //     ...postData,
  //     tags: postData.tags.filter((tag) => tag !== chipToDelete),
  //   });
  // };

  console.log(currentId)

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
