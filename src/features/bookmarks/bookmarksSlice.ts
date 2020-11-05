import { createSlice } from '@reduxjs/toolkit';

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    data: [
      {
        id: 1,
        title: 'Website Title 1',
        description: 'Website Description',
        url: 'https://whatever.com',
        tags: [1, 2, 3],
        upVotes: 10,
        downVotes: 12,
        pageContent: '<html></html>',
        author: 12345,
        timestamp: Date.now(),
      },
      {
        id: 2,
        title: 'Website Title 2',
        description: 'Website Description',
        url: 'https://whatever.com',
        tags: [1, 2, 3],
        upVotes: 10,
        downVotes: 12,
        pageContent: '<html></html>',
        author: 12345,
        timestamp: Date.now(),
      },
    ],
    isLoading: 'idle',
  },
  reducers: {
    recentBookmarksFetched: (state, action) => {
      // TODO
    },
    popularBookmarksFetched: (state, action) => {
      // TODO
    },
    myBookmarksFetched: (state, action) => {
      // TODO
    },
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;

export default {
  bookmarksSlice,
  bookmarksReducer,
  ...bookmarksSlice.actions,
};
