import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { appReducer } from './appSlice';
import { bookmarksReducer } from 'features/bookmarks/bookmarksSlice';
import { listsReducer } from 'features/lists/listsSlice';
import { ratingsReducer } from 'features/ratings/ratingsSlice';
import { profileReducer } from 'features/profile/profileSlice';

import type { AppSliceState } from 'app/appSlice';
import type { ProfileSliceState } from 'features/profile/profileSlice';
import type { BookmarksSliceState } from 'features/bookmarks/bookmarksSlice';
import type { RatingsSliceState } from 'features/ratings/ratingsSlice';
import type { ListsSliceState } from 'features/lists/listsSlice';

export type State = {
  app: AppSliceState;
  bookmarks: BookmarksSliceState;
  profile: ProfileSliceState;
  ratings: RatingsSliceState;
  lists: ListsSliceState;
};

const rootPersistConfig = {
  version: 1,
  key: 'root',
  storage,
  blacklist: ['app', 'bookmarks', 'ratings', 'lists'],
};

const rootReducer = combineReducers({
  app: appReducer,
  bookmarks: bookmarksReducer,
  lists: listsReducer,
  ratings: ratingsReducer,
  profile: persistReducer(
    {
      key: 'profile',
      storage,
      whitelist: ['did', 'isAuthenticated', 'authenticationMethod'],
    },
    profileReducer
  ),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;

export default store;
