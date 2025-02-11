import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../app/css/games/GameDetailsPage.css';
import Link from 'next/link';
import '../../app/css/Header.css';
import localFont from 'next/font/local';
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
}

const wizard1Font = localFont({
  src: '../../app/wizard1.ttf',
  display: 'swap',
});

const GameDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchGameDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/game-information/game-details`,
          {
            params: { id },
          },
        );
        setGameDetails(response.data);
      } catch (err) {
        setError('Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

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
        <div className="game-details-container">
          {gameDetails && (
            <>
              <div className="game-details-header">
                <h1>{gameDetails.name}</h1>
              </div>
              <img
                src={gameDetails.backgroundImage}
                alt={gameDetails.name}
                className="game-details-image"
              />
              <div className="game-details-info">
                <p>{gameDetails.description}</p>
                <p className="game-release-date">
                  Release Date: {gameDetails.releaseDate}
                </p>
                <p>Metacritic Score: {gameDetails.metacritic}</p>
                <p>Rating: {gameDetails.rating}</p>
                <p>
                  Website:{' '}
                  <a href={gameDetails.website}>{gameDetails.website}</a>
                </p>
                <p>Requirements: {gameDetails.requirements}</p>
              </div>
            </>
          )}
          <Link href="/games" className="game-details-back-link">
            Back to Games List
          </Link>
        </div>
      </div>
    </main>
  );
};

export default GameDetailsPage;
