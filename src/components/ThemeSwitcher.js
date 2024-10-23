import React from "react";
import { createTheme, ThemeProvider, CssBaseline, Switch } from "@mui/material";
import { useState } from "react";

function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
    </ThemeProvider>
  );
}

export default ThemeSwitcher;
