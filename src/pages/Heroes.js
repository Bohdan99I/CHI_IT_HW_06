import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Box, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import LoadMoreButton from "../components/LoadMoreButton";

const apiURL = "https://rickandmortyapi.com/api/character";

function Heroes() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const fetchCharacters = async (page) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiURL}?page=${page}`);
        const data = await response.json();
        if (!isCancelled) {
          setCharacters((prev) => [...prev, ...data.results]);
          setTotalPages(data.info.pages);
        }
      } catch (error) {
        if (!isCancelled) setError("Error fetching characters");
        console.error("Error fetching characters:", error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchCharacters(currentPage);

    return () => {
      isCancelled = true;
    };
  }, [currentPage]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const handleRowClick = (params) => {
    navigate(`${params.id}`);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flex: 1, height: 500, textAlign: "center", p: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
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
        <LoadMoreButton
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage((prevPage) => prevPage + 1);
            }
          }}
          show={!loading && currentPage < totalPages}
        />
      </Box>
      <Box
        sx={{
          width: 300,
          p: 2,
          boxSizing: "border-box",
          overflowY: "auto",
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Heroes;
