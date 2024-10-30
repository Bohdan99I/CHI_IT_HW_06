import React from "react";
import { Switch } from "@mui/material";

const ThemeSwitcher = ({ setDarkMode }) => {
  const handleToggle = (event) => {
    setDarkMode(event.target.checked);
  };

  return <Switch onChange={handleToggle} color="default" />;
};

export default ThemeSwitcher;
