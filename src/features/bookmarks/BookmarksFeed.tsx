import React from 'react';

import { BookmarkPost } from './BookmarkPost';

export function BookmarksFeed({ bookmarks = [] }: { bookmarks?: any[] }) {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {bookmarks.map((bookmark, i) => (
              <BookmarkPost
                key={`bookmark-${i}`}
                authorAddress={'0x4F4ABE98Ac96b804d41837192ef0b73EB0C502E6'}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
