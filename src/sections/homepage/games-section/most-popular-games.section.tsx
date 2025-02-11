'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../../../app/css/Header.css';
import Link from 'next/link';

const wizard1Font = localFont({
  src: '../../wizard1.ttf',
  display: 'swap',
});

const handleScroll = (event: { target: any; deltaY: any }) => {
  const container = event.target;
  const scrollAmount = event.deltaY;
  container.scrollTo({
    top: 0,
    left: container.scrollLeft + scrollAmount,
    behavior: 'smooth',
  });
};

export function MostPopularGamesSection() {
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [topGames, setTopGames] = useState<any[]>([]);
  useEffect(() => {
    fetchTopGames();
  }, []);

  const fetchTopGames = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/game-information/top-games?page=1&pageSize=8',
      );
      setTopGames(response.data.results);
      setError(null);
    } catch (error) {
      console.error('Error fetching top games:', error);
      setError('Failed to fetch top games. Please try again.');
    }
  };

  return (
    <main className={wizard1Font.className}>
      <div>
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Most popular games right now...
        </h1>
        <div className="homepage-top-games-container" onWheel={handleScroll}>
          {topGames.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
              <div className="game-box">
                <img
                  src={game.backgroundImage}
                  alt={game.name}
                  className="game-image"
                />
                <h2 className="game-title">{game.name}</h2>
                <p className="game-release-date">
                  Released: {game.releaseDate}
                </p>
              </div>
            </Link>
          ))}
          <button className="button-78"> Explore more...</button>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
