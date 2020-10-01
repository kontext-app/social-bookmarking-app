import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="w-full px-6 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto justify-between flex items-center h-16">
        <div className="space-x-1">
          <Link to="/">Kontext</Link>
        </div>
        <div className="space-x-5">
          <Link to="/recent">Recent</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/my">My Bookmarks</Link>
        </div>
        <div>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
