import React from 'react';

export function BookmarksFeed({ bookmarks = [] }) {
  return (
    <div className="mx-auto container">
      {bookmarks.map((bookmark) => (
        <div className="flex-row">
          <div className="w-2">{bookmark.upVotes - bookmark.downVotes}</div>
          <div className="flex-col">
            <div>{bookmark.title}</div>
            <div>{bookmark.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
