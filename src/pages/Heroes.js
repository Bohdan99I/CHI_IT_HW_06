import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  Box,
  Drawer,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const apiURL = "https://rickandmortyapi.com/api/character";

function Heroes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedHero, setSelectedHero] = useState(null);

  const theme = useTheme(); 

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}?page=${page}`);
      const data = await response.json();
      setCharacters((prev) => [...prev, ...data.results]);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleRowClick = (params) => {
    const heroId = params.id;
    fetchHero(heroId);
  };

  const fetchHero = async (id) => {
    try {
      const response = await fetch(`${apiURL}/${id}`);
      const data = await response.json();
      setSelectedHero(data);
    } catch (error) {
      console.error("Error fetching hero:", error);
    }
  };

  const handleClose = () => {
    setSelectedHero(null);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flex: 1, height: 500, textAlign: "center", p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={characters}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            sx={{
              backgroundColor: theme.palette.background.default, 
              color: theme.palette.text.primary, 
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "lightgreen",
              },
            }}
          />
        )}
        {!loading && currentPage < totalPages && (
          <Button
            variant="contained"
            onClick={() => setCurrentPage(currentPage + 1)}
            sx={{ mt: 2 }}
          >
            Load More
          </Button>
        )}
      </Box>

      {selectedHero && (
        <Drawer
          anchor="right"
          open={Boolean(selectedHero)}
          onClose={handleClose}
          sx={{ width: 300, flexShrink: 0 }}
          PaperProps={{
            sx: {
              width: 300,
              padding: 2,
              bgcolor: theme.palette.background.paper,
            },
          }}
        >
          <IconButton onClick={handleClose} sx={{ alignSelf: "flex-end" }}>
            <CloseIcon />
          </IconButton>
          <Box textAlign="center">
            <img
              src={selectedHero.image}
              alt={selectedHero.name}
              width="100%"
            />
            <Typography variant="h4" color="text.primary">             
              {selectedHero.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Status: {selectedHero.status}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Species: {selectedHero.species}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gender: {selectedHero.gender}
            </Typography>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Heroes;
