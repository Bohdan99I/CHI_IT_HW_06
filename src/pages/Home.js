import React from "react";
import { Typography, Box } from "@mui/material";

function Home() {
  return (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ justifyContent: "center" }}>
        Welcome to the Rick & Morty App!
      </Typography>
    </Box>
  );
}

export default Home;
