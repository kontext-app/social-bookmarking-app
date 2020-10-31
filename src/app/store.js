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
import { profileReducer } from 'features/profile/profileSlice';

const rootReducer = combineReducers({
  app: appReducer,
  bookmarks: bookmarksReducer,
  profile: profileReducer,
});

const persistConfig = {
  version: 1,
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
