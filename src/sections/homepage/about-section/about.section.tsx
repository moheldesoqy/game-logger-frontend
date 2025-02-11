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

export function AboutSection() {
  useEffect(() => {}, []);
  return (
    <main className={wizard1Font.className}>
      <div className="synoposis-container">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          What's the Adventure Diary?
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
          Hello! The adventure diary was made with the intent of logging the
          games you played, explore new games on all different platforms, & get
          recommended new adventures to pursue.
        </p>
      </div>
    </main>
  );
}
