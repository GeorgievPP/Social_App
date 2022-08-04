import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// MATERIAL UI
import {
  Switch,
  Container,
  Grow,
  Grid,
  TextField,
  Button,
  Modal,
  Box,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
// STYLED COMPONENTS
import { AppBarSearch, PaperPagination, BoxPop, PaperStyled } from "./styled";

import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

// COMPONENT
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

// ACTIONS
import { getPostsBySearch } from "../../actions/posts";

import { ColorModeContext } from "../../App";

// USE LOCATION
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// HOME COMPONENT
const Home = () => {
  // USE STATE
  const [currentId, setCurrentId] = useState(null);
  // USE STATE SEARCH
  const [search, setSearch] = useState("");
  // USE STATE TAGS
  const [tags, setTags] = useState([]);

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // USE REDUX
  const dispatch = useDispatch();

  // USE LOCATION FUNC USE QUERY
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  // USE NAVIGATE
  const navigate = useNavigate();

  // SEARCH HANDLER
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  // ENTER, ADD, REMOVE TAGS HANDLERS
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  // TEMPLATE RETURN
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBarSearch position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBarSearch>
            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            {!searchQuery && !tags.length && (
              <PaperPagination elevation={6}>
                <Pagination page={page} />
              </PaperPagination>
            )}
            <PaperStyled>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(null);
                  handleOpen()
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Add Post <AddAPhotoIcon sx={{ ml: 1 }} />
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                // aria-labelledby="parent-modal-title"
                // aria-describedby="parent-modal-description"
              >
                <BoxPop>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </BoxPop>
              </Modal>
            </PaperStyled>
            <PaperStyled>
              <Box
              // sx={{
              //   display: "flex",
              //   width: "100%",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   bgcolor: "background.default",
              //   color: "text.primary",
              //   borderRadius: 1,
              //   p: 3,
              // }}
              >
                {theme.palette.mode} mode
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Box>
            </PaperStyled>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
