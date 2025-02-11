'use client';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../app/css/Header.css';
import Link from 'next/link';
import { MostPopularGamesSection } from '@/sections/homepage/games-section/most-popular-games.section';
import { PopularPlatformsSection } from '@/sections/homepage/platforms-section/popular-platforms.section';
import { RecommendationsSection } from '@/sections/homepage/recommendation-section/recommendedations.section.tsx';
import MusicSelectionSection from '@/sections/homepage/music-selection-section/music-selection.section';
import { AboutSection } from '@/sections/homepage/about-section/about.section';

const wizard1Font = localFont({
  src: 'wizard1.ttf',
  display: 'swap',
});

export default function Home() {
  const Header = () => (
    <div className="header">
      <div className="logo">Moh's Ultimate Adventure Diary</div>
      <div className="nav-links">
        <Link href="games">Games</Link>
        <Link href="genres">Genres</Link>
        <a href="#">Recommendations</a>
        <a href="#">Profile</a>
      </div>
    </div>
  );

  return (
    <main className={wizard1Font.className}>
      <Header />
      <div className="banner-container">
        <div className="banner-overlay"></div>
      </div>
      <MusicSelectionSection></MusicSelectionSection>
      <AboutSection></AboutSection>
      <MostPopularGamesSection></MostPopularGamesSection>
      <PopularPlatformsSection></PopularPlatformsSection>
      <RecommendationsSection></RecommendationsSection>
      <ToastContainer />
    </main>
  );
}
