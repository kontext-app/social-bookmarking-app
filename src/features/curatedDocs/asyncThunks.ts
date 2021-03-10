import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ceramic from 'app/apis/ceramic';
import * as recommender from 'app/apis/recommender';
import { flattenDoc } from 'app/utils/doc';

import { curatedDocsReceived } from 'features/curatedDocs/curatedDocsSlice';

import type { State } from 'app/store';
import type { CuratedDocs } from './types';

export const fetchCuratedBookmarksDoc = createAsyncThunk<
  CuratedDocs,
  void,
  { state: State }
>('curatedDocs/fetchCuratedBookmarksDoc', async (_, thunkAPI) => {
  const curatedBookmarksDocID = await recommender.getCuratedBookmarksDocID();

  if (!curatedBookmarksDocID) {
    thunkAPI.rejectWithValue(
      new Error('Recommender return empty doc id for CuratedDocs')
    );
  }

  const curatedBookmarksDoc = await ceramic.loadDocument(
    curatedBookmarksDocID as string
  );
  const curatedBookmarks = flattenDoc(curatedBookmarksDoc);
  thunkAPI.dispatch(
    curatedDocsReceived({
      indexKey: 'bookmarks',
      ...curatedBookmarks,
    })
  );

  return curatedBookmarks;
});

export default {
  fetchCuratedBookmarksDoc,
};
