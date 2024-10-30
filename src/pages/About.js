import React from "react";
import { Typography, Box } from "@mui/material";

function About() {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4">About This App</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This app displays Rick & Morty characters using the Rick and Morty API.
      </Typography>
    </Box>
  );
}

export default About;
