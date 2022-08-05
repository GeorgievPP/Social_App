import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// MATERIAL UI
import {
  Container,
  Grow,
  Grid,
  Button,
  Modal,
  Box,
} from "@mui/material";
// STYLED COMPONENTS
import { AppBarSearch, PaperPagination, BoxPop, PaperStyled, TextFieldStyled } from "./styled";

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
      dispatch(getPostsBySearch({ search, tags: tags }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
    } else {
      navigate("/");
    }
  };

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
              <TextFieldStyled
                name="search"
                variant="outlined"
                label="Search Post"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TextFieldStyled
                name="search"
                variant="outlined"
                label="Search Category"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <Button onClick={searchPost} variant="contained" color="primary">
                Search
              </Button>
            </AppBarSearch>
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
                  handleOpen();
                }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Add Post <AddAPhotoIcon sx={{ ml: 1 }} />
              </Button>
              <Modal open={open} onClose={handleClose}>
                <BoxPop>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </BoxPop>
              </Modal>
            </PaperStyled>
            <PaperStyled>
              <Box>
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
