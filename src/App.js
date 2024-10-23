import React, { useState, useEffect } from "react";
import "./style.css";

const apiURL = "https://rickandmortyapi.com/api/character";

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [prevPageAvailable, setPrevPageAvailable] = useState(false);
  const [nextPageAvailable, setNextPageAvailable] = useState(false);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}?page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setPrevPageAvailable(data.info.prev !== null); 
      setNextPageAvailable(data.info.next !== null);
      setLoading(false);
    } catch (error) {
      console.error("Помилка завантаження даних:", error);
      setLoading(false);
    }
  };

  const handlePrevClick = () => {
    if (prevPageAvailable) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (nextPageAvailable) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>Rick & Morty Characters</h1>
      <div id="characters">
        {characters.map((character) => (
          <div key={character.id} className="character">
            <img src={character.image} alt={character.name} width="100" />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      <div>
        <button onClick={handlePrevClick} disabled={!prevPageAvailable}>
          Prev
        </button>
        <span id="pageNumber">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={!nextPageAvailable}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
