import React from "react";
import { Switch, FormControlLabel, Box } from "@mui/material";

const ThemeSwitcher = ({ setDarkMode }) => {
  const handleToggle = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <FormControlLabel
        control={
          <Switch
            onChange={handleToggle}
            color="primary"
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "#8a8a8a",
              },
              "&.Mui-checked .MuiSwitch-thumb": {
                backgroundColor: "#fff",
              },
              "&.Mui-checked .MuiSwitch-track": {
                backgroundColor: "#444",
              },
            }}
          />
        }
      />
    </Box>
  );
};

export default ThemeSwitcher;
