import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const apiURL = "https://rickandmortyapi.com/api/character";

function Heroes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

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
    navigate(`/heroes/${params.id}`);
  };

  return (
    <Box sx={{ height: 500, width: "100%", textAlign: "center" }}>
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
            backgroundColor: "#fff",
            color: "#000",
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
  );
}

export default Heroes;
