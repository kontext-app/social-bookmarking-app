import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

import { addAsyncMatchers } from 'app/utils/slice';

import type { CuratedDocs, CuratedDocsIndex } from 'features/curatedDocs/types';
import type { LoadingStatus } from 'kontext-common';

export type CuratedDocsSliceState = {
  curatedDocsIndex: EntityState<CuratedDocsIndex>;
  curatedDocs: EntityState<CuratedDocs>;
  loadingStatus: LoadingStatus;
  error: null | Error;
  lastUpdated: null | number;
};

export const curatedDocsIndexAdapter = createEntityAdapter<CuratedDocsIndex>({
  selectId: (curatedDocsIndex) => curatedDocsIndex.docID,
});

export const curatedDocsAdapter = createEntityAdapter<CuratedDocs>({
  selectId: (curatedDocs) => curatedDocs.docID,
});

const initialState: CuratedDocsSliceState = {
  curatedDocsIndex: curatedDocsIndexAdapter.getInitialState(),
  curatedDocs: curatedDocsAdapter.getInitialState(),
  loadingStatus: enums.LoadingStatus.IDLE,
  error: null,
  lastUpdated: null,
};

export const curatedDocsSlice = createSlice({
  name: 'curatedDocs',
  initialState,
  reducers: {
    curatedDocsIndexReceived: (state, action) => {
      curatedDocsIndexAdapter.removeAll(state.curatedDocsIndex);
      curatedDocsIndexAdapter.upsertOne(state.curatedDocsIndex, action.payload);
    },
    curatedDocsReceived: (state, action) => {
      curatedDocsAdapter.upsertOne(state.curatedDocs, action.payload);
    },
  },
  extraReducers: (builder) => {
    addAsyncMatchers(builder, 'curatedDocs');
  },
});

export const curatedDocsReducer = curatedDocsSlice.reducer;

export const {
  curatedDocsIndexReceived,
  curatedDocsReceived,
} = curatedDocsSlice.actions;

export default {
  curatedDocsSlice,
  curatedDocsReducer,
  ...curatedDocsSlice.actions,
};
