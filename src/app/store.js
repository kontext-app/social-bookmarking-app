import { configureStore } from '@reduxjs/toolkit';

import { appReducer } from './appSlice';
import { bookmarksReducer } from '../features/bookmarks/bookmarksSlice';
import { profileReducer } from '../features/profile/profileSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    bookmarks: bookmarksReducer,
    profile: profileReducer,
  },
});
