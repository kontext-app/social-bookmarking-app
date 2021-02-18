import {
  createSlice,
  createEntityAdapter,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import type { ListsIndex, List } from 'features/lists/types';
import type { LoadingStatus } from 'kontext-common';

export type ListsSliceState = {
  listsIndex: EntityState<ListsIndex>;
  lists: EntityState<List>;
  loadingStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

export const listsIndexAdapter = createEntityAdapter<ListsIndex>({
  selectId: (listsIndex) => listsIndex.docID,
});

export const listsAdapter = createEntityAdapter<List>({
  selectId: (list) => list.docID,
  sortComparer: (a, b) =>
    Date.parse(b.creationDate) - Date.parse(a.creationDate),
});

const initialState: ListsSliceState = {
  listsIndex: listsIndexAdapter.getInitialState(),
  lists: listsAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    listsIndexReceived: (state, action: PayloadAction<ListsIndex>) => {
      listsIndexAdapter.removeAll(state.listsIndex);
      listsIndexAdapter.upsertOne(state.listsIndex, action.payload);
    },
    listsReceived: (state, action: PayloadAction<List[]>) => {
      listsAdapter.upsertMany(state.lists, action.payload);
    },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'lists');
  },
});

export const listsReducer = listsSlice.reducer;

export const { listsIndexReceived, listsReceived } = listsSlice.actions;

export default {
  listsSlice,
  listsReducer,
  ...listsSlice.actions,
};
