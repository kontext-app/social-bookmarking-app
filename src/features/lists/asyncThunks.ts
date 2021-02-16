import { createAsyncThunk } from '@reduxjs/toolkit';

import * as ceramic from 'app/apis/ceramic';
import { selectListsIndex } from 'features/lists/selectors';
import { listsIndexReceived, listsReceived } from 'features/lists/listsSlice';
import { enrichPartialList } from 'features/lists/utils';
import { selectProfileDID } from 'features/profile/selectors';
import { flattenDoc } from 'app/utils/doc';

import type { ListsIndex } from 'features/lists/types';
import type { State } from 'app/store';
import type { ListDocContent } from 'kontext-common';

export const fetchListsIndex = createAsyncThunk<void, void, { state: State }>(
  'lists/fetchListsIndex',
  async (_, thunkAPI) => {
    const listsIndexDocID = await ceramic.getListsIndexDocID();

    if (!listsIndexDocID) {
      thunkAPI.rejectWithValue(new Error('ListsIndexDocID is null'));
    }

    const listsIndexDoc = await ceramic.loadDocument(listsIndexDocID as string);
    const listsIndex = flattenDoc(listsIndexDoc);
    thunkAPI.dispatch(listsIndexReceived(listsIndex));
  }
);

export const fetchListsOfIndexKey = createAsyncThunk<
  void,
  { indexKey: string },
  { state: State }
>('lists/fetchListsOfIndexKey', async (payload, thunkAPI) => {
  const listsIndex = selectListsIndex(thunkAPI.getState());

  if (!listsIndex) {
    thunkAPI.rejectWithValue(new Error('ListsIndexDoc not set in state'));
  }

  const { indexKey } = payload;

  if (!(listsIndex as ListsIndex)[indexKey]) {
    thunkAPI.rejectWithValue(
      new Error(`Index key ${indexKey} does not exist in ListsIndex`)
    );
  }

  const listDocIDsOfIndexKey = (listsIndex as ListsIndex)[indexKey];
  const listDocs = await Promise.all(
    listDocIDsOfIndexKey.map(ceramic.loadDocument)
  );
  const flattenedListDocs = listDocs.map((doc) => flattenDoc(doc));

  thunkAPI.dispatch(listsReceived(flattenedListDocs));
});

export const addList = createAsyncThunk<
  string,
  {
    listToAdd: Partial<ListDocContent>;
    listsIndexKey: string;
  },
  { state: State }
>('lists/add', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const listsIndex = selectListsIndex(thunkAPI.getState());

  if (!listsIndex) {
    thunkAPI.rejectWithValue(new Error('ListsIndexDoc not loaded'));
  }

  if (!(listsIndex as ListsIndex)[payload.listsIndexKey]) {
    thunkAPI.rejectWithValue(
      new Error(
        `Index key ${payload.listsIndexKey} does not exist in ListsIndex`
      )
    );
  }

  const createdListDocID = await ceramic.createListDoc(
    enrichPartialList({
      ...payload.listToAdd,
      author: authorDID as string,
    })
  );
  const updatedListsIndexDocContent = await ceramic.addListDocToListsIndex(
    createdListDocID,
    payload.listsIndexKey
  );

  thunkAPI.dispatch(
    listsIndexReceived({
      ...listsIndex,
      ...updatedListsIndexDocContent,
    })
  );

  return createdListDocID;
});

export default {
  fetchListsIndex,
  fetchListsOfIndexKey,
  addList,
};