'use client';
import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import localFont from 'next/font/local';
import '../../../app/css/Header.css';

const wizard1Font = localFont({
  src: '../../wizard1.ttf',
  display: 'swap',
});

export default function MusicSelectionSection() {
  const [currentTheme, setCurrentTheme] = useState<string>('theme4.mp3');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
    }
  }, [currentTheme]);

  const themeTitles: string[] = [
    'Furious Bjorn, The Mighty..',
    'Adventurer Albus, The Despaired..',
    'Alchemist Matty Groves, The Fearful..',
    'Wizarderly Moh, The Problematic..',
    'Chief Michal, The Brains..',
    'Warrior Yasia, The Thirsty..',
    'Hania, The Frantic..',
    'Little Sadie, The Bullseye..',
    'Adaline-dar, The Moonshine Dealer..',
    'Magnus, Of the Shivering Isles..',
    'Molan, Chanter of Arabia',
  ];
  return (
    <main className={wizard1Font.className}>
      <div className="content-container">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          Rest up travellers... log down your adventures
        </h1>
        <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>
          Select Your Guiding Spirit..
        </h3>
        <div className="campfire-container"></div>
        <div className="button-container">
          {[
            'theme1',
            'theme2',
            'theme3',
            'theme4',
            'theme5',
            'theme6',
            'theme7',
            'theme8',
            'theme9',
            'theme10',
            'theme11',
          ].map((theme, index) => (
            <button
              key={index}
              onClick={() => setCurrentTheme(`${theme}.mp3`)}
              className="theme-button"
            >
              {themeTitles[index]}
            </button>
          ))}
        </div>
      </div>
      <audio ref={audioRef} src={`/themes/${currentTheme}`} autoPlay loop />
      <ToastContainer />
    </main>
  );
}
