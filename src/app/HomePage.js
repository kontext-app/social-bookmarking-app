import React from 'react';
import { Post } from './components/Post.js';

export function HomePage() {
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto">
        <div class="flex justify-center ">
          <div class="text-gray-700 text-center px-4 py-2 m-2">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}
