import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// new mui
import { Container, createTheme, ThemeProvider } from "@mui/material";

// COMPONENTS
import PostDetails from "./components/PostDetails/PostDetails";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Container maxWidth="lg">
          <NavBar />
          <Routes>
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home setMode={setMode} mode={mode} />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
