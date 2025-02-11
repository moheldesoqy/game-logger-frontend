import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../app/css/genres/GenresPage.css';
import Link from 'next/link';
import '../app/css/Header.css';
import localFont from 'next/font/local';
import Header from '@/sections/header/header';

const wizard1Font = localFont({
  src: '../app/wizard1.ttf',
  display: 'swap',
});

const GenresPage = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 20;

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/genres?page=${currentPage}&pageSize=${pageSize}`,
        );
        setGenres(response?.data.genres);
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
      <div></div>
      <div className="genres-banner-container">
        <div className="genres-banner-overlay"></div>
      </div>
      <div className="genres-container">
        <div className="genres-title-container">
          <h1>Genres List</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="genres-list">
            {genres.map((genre) => (
              <Link href={`/genres/${genre.id}`} key={genre.id}>
                <div className="genres-box" key={genre.id}>
                  <img
                    src={genre.backgroundImage}
                    alt={genre.name}
                    className="genres-image"
                  />
                  <h2 className="genres-title">{genre.name}</h2>
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
          <span>
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

export default GenresPage;
