import React from 'react';
import { LandingPage } from './components/LandingPage.js';

export function HomePage() {
  return (
    <div className="bg-gray-200 h-full">
      <div className="container mx-auto h-screen">
        <div class="flex justify-center ">
          <div class="text-gray-700 text-center px-4 py-2 m-2">
            <LandingPage />
          </div>
        </div>
      </div>
    </div>
  );
}
