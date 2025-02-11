import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/css/games/GamePage.css';
import Link from 'next/link';
import '../app/css/Header.css';
import TextField from '@mui/material/TextField';
import localFont from 'next/font/local';
import '../app/css/Header.css';
import Header from '@/sections/header/header';

const wizard1Font = localFont({
  src: '../app/wizard1.ttf',
  display: 'swap',
});

const GamePage = () => {
  const [games, setGames] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 15;

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/game-information/games?page=${currentPage}&pageSize=${pageSize}`,
        );
        setGames(response.data.results);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <main className={wizard1Font.className}>
      <Header />
      <div className="games-banner-container">
        <div className="games-banner-overlay"></div>
      </div>
      <div>{/* Other components or content */}</div>
      <div className="game-container">
        <div className="game-title-container">
          <h1>Game List</h1>
        </div>

        <div className="MuiTextField-root">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search for a game.."
          />
        </div>

        {/* Display loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="game-list">
            {games.map((game) => (
              <Link href={`/games/${game.id}`} key={game.id}>
                <div className="game-box" key={game.id}>
                  <img
                    src={game.backgroundImage}
                    alt={game.name}
                    className="game-image"
                  />
                  <h2 className="game-title">{game.name}</h2>
                  <p className="game-rating">
                    Rating: {game.rating} / 5 ({game.numberOfRatings} ratings)
                  </p>
                  <p className="game-release-date">
                    Released: {game.releaseDate}
                  </p>
                  <button className="button-54">Played</button>
                  <button className="button-54">Wishlist</button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination controls */}
        <div className="pagination">
          <button
            className="button-54"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="button-54"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default GamePage;
