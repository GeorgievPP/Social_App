import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// MATERIAL UI
import { Container } from "@material-ui/core";

// COMPONENTS
import PostDetails from "./components/PostDetails/PostDetails";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <NavBar />
        <Routes>
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
