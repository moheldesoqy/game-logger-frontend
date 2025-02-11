'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../../../app/css/Header.css';

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

export function PopularPlatformsSection() {
  const [error, setError] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<any[]>([]);
  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/platforms?page=3&pageSize=8',
      );
      setPlatforms(response.data.results);
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
          Popular platforms...
        </h1>
        <div className="homepage-top-games-container" onWheel={handleScroll}>
          {platforms.map((platform) => (
            <div className="game-box" key={platform.id}>
              <img
                src={platform.backgroundImage}
                alt={platform.name}
                className="game-image"
              />
              <h2 className="game-title">{platform.name}</h2>
            </div>
          ))}
          <button className="button-78"> Explore more...</button>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
