import { configureStore } from '@reduxjs/toolkit';

import { bookmarksReducer } from '../features/bookmarks/bookmarksSlice';

export default configureStore({
  reducer: {
    bookmarks: bookmarksReducer,
  },
});
