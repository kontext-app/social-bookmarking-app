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
import {
  profileReducer,
  ProfileSliceState,
} from 'features/profile/profileSlice';

export type State = {
  app: any;
  bookmarks: any;
  profile: ProfileSliceState;
};

const rootPersistConfig = {
  version: 1,
  key: 'root',
  storage,
  blacklist: ['app', 'bookmarks', 'profile'],
};

const rootReducer = combineReducers({
  app: appReducer,
  bookmarks: bookmarksReducer,
  profile: persistReducer(
    {
      key: 'profile',
      storage,
      whitelist: ['did', 'isAuthenticated'],
    },
    profileReducer
  ),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
