import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// new mui
import { Container, createTheme, ThemeProvider } from "@mui/material";

// COMPONENTS
import PostDetails from "./components/PostDetails/PostDetails";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Footer from "./components/Footer";
import EmailPosts from "./components/EmailPosts";
import Missing from "./components/Missing";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = () => {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Container maxWidth="lg">
            <NavBar />
            <Routes>
              <Route path="/posts/search" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/posts/email" element={<EmailPosts />} />
              <Route path="/posts" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Missing />} />
            </Routes>
            <Footer />
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
