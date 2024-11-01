import React from "react";
import { Button } from "@mui/material";

const LoadMoreButton = ({ onClick, show }) => {
  return (
    show && (
      <Button variant="contained" onClick={onClick} sx={{ mt: 2 }}>
        Load More
      </Button>
    )
  );
};

export default LoadMoreButton;
