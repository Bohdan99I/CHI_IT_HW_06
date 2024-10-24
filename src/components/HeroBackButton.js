import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Hero from "../pages/Hero";

function HeroBackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/heroes");
  };

  return (
    <div>
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon
          sx={{
            backgroundColor: "#fff",
            color: "#000",
          }}
        />
      </IconButton>
      <Hero />
    </div>
  );
}

export default HeroBackButton;
