import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";

const apiURL = "https://rickandmortyapi.com/api/character";

function Hero() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, [id]);

  const fetchHero = async () => {
    try {
      const response = await fetch(`${apiURL}/${id}`);
      const data = await response.json();
      setHero(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading character:", error);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>     
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <img src={hero.image} alt={hero.name} width="100%" />
          <Typography variant="h4">{hero.name}</Typography>
          <Typography variant="body1">Status: {hero.status}</Typography>
          <Typography variant="body1">Species: {hero.species}</Typography>
          <Typography variant="body1">Gender: {hero.gender}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Hero;
