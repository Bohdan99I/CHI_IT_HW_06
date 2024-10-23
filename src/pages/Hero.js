import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";

function Hero() {
  const { id } = useParams();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, [id]);

  const fetchHero = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await response.json();
      setHero(data);
      setLoading(false);
    } catch (error) {
      console.error("Помилка завантаження персонажа:", error);
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <img src={hero.image} alt={hero.name} />
          <Typography variant="h4">{hero.name}</Typography>
          <Typography variant="body1">{hero.status}</Typography>
          <Typography variant="body1">{hero.species}</Typography>
        </div>
      )}
    </Box>
  );
}

export default Hero;
