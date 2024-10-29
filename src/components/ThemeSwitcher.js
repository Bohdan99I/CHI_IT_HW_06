import React from "react";
import { createTheme, ThemeProvider, CssBaseline, Switch } from "@mui/material";
import { useState } from "react";

function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            // Налаштування для темної теми
            background: {
              default: "#121212", // Змінює колір фону
              paper: "#1e1e1e", // Колір панелей
            },
            text: {
              primary: "#ffffff", // Основний текст
              secondary: "#bbbbbb", // Другорядний текст
            },
          }
        : {
            // Налаштування для світлої теми
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000",
              secondary: "#333333",
            },
          }),
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
