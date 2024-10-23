import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Box,
} from "@mui/material";

import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import Hero from "./pages/Hero";
import About from "./pages/About";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 40,
            flexShrink: 0,
          }}
        >
          <List>
            <ListItem>
              <Link to="/">Home</Link>
            </ListItem>
            <ListItem>
              <Link to="/heroes">Heroes</Link>
            </ListItem>
            <ListItem>
              <Link to="/about">About</Link>
            </ListItem>
          </List>
        </Drawer>

        <main style={{ marginLeft: 40, padding: "16px", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
            <ThemeSwitcher />
          </Box>

          <AppBar position="static">
            <Toolbar sx={{ justifyContent: "center" }}>
              <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: "center", my: 1 }}
              >
                Rick & Morty
              </Typography>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Hero />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
