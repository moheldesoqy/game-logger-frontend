import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo">Moh's Ultimate Adventure Diary</div>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/games">Games</Link>
        <Link href="/genres">Genres</Link>
        <a href="#">Recommendations</a>
        <a href="#">Profile</a>
      </div>
    </div>
  );
};

export default Header;
