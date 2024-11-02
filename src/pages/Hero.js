import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress, useTheme } from "@mui/material";

const apiURL = "https://rickandmortyapi.com/api/character";

function Hero() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiURL}/${id}`);
        const data = await response.json();
        setHero(data);
      } catch (error) {
        setError("Error loading character");
        console.error("Error loading character:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, [id]);

  return (
    <Box sx={{ textAlign: "center", mt: 4, color: theme.palette.text.primary }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
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
