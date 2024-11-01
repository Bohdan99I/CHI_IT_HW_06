import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom"; 
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  Box,
  Link as MuiLink,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import About from "./pages/About";
import Hero from "./pages/Hero";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", 
    },
  });

  return (
    <ThemeProvider theme={theme}>         
      <Router>
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant="permanent"
            sx={{
              width: 40,
              flexShrink: 0,
            }}
          >
            <List>
              <ListItem>
                <MuiLink component={RouterLink} to="/" underline="none">
                  Home
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink component={RouterLink} to="/heroes" underline="none">
                  Heroes
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink component={RouterLink} to="/about" underline="none">
                  About
                </MuiLink>
              </ListItem>
            </List>
          </Drawer>

          <main style={{ marginLeft: 40, padding: "16px", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
              <ThemeSwitcher setDarkMode={setDarkMode} />{" "}              
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
              <Route path="/heroes" element={<Heroes />}>
                <Route path=":id" element={<Hero />} />
              </Route>
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
