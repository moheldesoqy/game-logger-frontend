import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import localFont from 'next/font/local';
import TextField from '@mui/material/TextField';
import '../../app/css/games/GameDetailsPage.css';
import '../../app/css/Header.css'
import Header from '@/sections/header/header';

interface GameDetails {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
  backgroundImage: string;
  metacritic: number;
  rating: number;
  website: string;
  requirements: string;
  numberOfRatings?: number; // if available
}

const wizard1Font = localFont({
  src: '../../app/wizard1.ttf',
  display: 'swap',
});

const GenresGamesPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // genre id from query
  const [gameDetails, setGameDetails] = useState<GameDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const pageSize = 15;

  useEffect(() => {
    if (!id) return;

    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/game-information/games-by-genre`,
          {
            params: { genres: id, pageSize, page: currentPage },
          },
        );
        setGameDetails(response.data.results);
        setTotalCount(response.data.count);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setLoading(true);
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className={wizard1Font.className}>
      <Header />
      <div className="game-container">
        <div className="games-banner-container">
          <div className="games-banner-overlay"></div>
        </div>
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

        <div className="game-list">
          {gameDetails.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <div className="game-box" key={game.id}>
                <img
                  src={game.backgroundImage}
                  alt={game.name}
                  className="game-image"
                />
                <h2 className="game-title">{game.name}</h2>
                <p className="game-rating">
                  Rating: {game.rating} / 5{' '}
                  {game.numberOfRatings && `(${game.numberOfRatings} ratings)`}
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

export default GenresGamesPage;
