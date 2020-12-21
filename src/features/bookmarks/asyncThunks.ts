import { createAsyncThunk } from '@reduxjs/toolkit';
import { schemas } from 'kontext-common';

import {
  setDefaultBookmarksIndex,
  hasBookmarksIndex,
  addBookmarkDocToBookmarksDoc,
  getBookmarksIndexDocID,
  loadDocument,
  createBookmarkDoc,
  getSchemaNameByDocID,
  isIDXAuthenticated,
} from 'app/apis/ceramic';
import {
  selectBookmarksIndex,
  selectBookmarksCollectionByDocID,
} from 'features/bookmarks/selectors';
import {
  bookmarksIndexReceived,
  anyCollectionsReceived,
  bookmarksReceived,
  bookmarksCollectionUpdated,
} from 'features/bookmarks/bookmarksSlice';
import { enrichPartialBookmark, flattenDoc } from 'features/bookmarks/utils';
import { selectProfileDID } from 'features/profile/selectors';

import type {
  BookmarksIndex,
  BookmarksCollection,
} from 'features/bookmarks/types';
import type { State } from 'app/store';
import type { BookmarkDocContent } from 'kontext-common';

export const bootstrapBookmarks = createAsyncThunk<
  void,
  void,
  { state: State }
>('bookmarks/bootstrap', async (payload, thunkAPI) => {
  if (!isIDXAuthenticated()) {
    return thunkAPI.rejectWithValue('IDX not authenticated');
  }

  const hasUserBookmarksIndex = await hasBookmarksIndex();

  const bookmarksIndexDocID = hasUserBookmarksIndex
    ? await getBookmarksIndexDocID()
    : await setDefaultBookmarksIndex();

  if (!bookmarksIndexDocID) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDocID is null'));
  }

  const bookmarksIndexDoc = await loadDocument(bookmarksIndexDocID as string);
  const bookmarksIndex = flattenDoc(bookmarksIndexDoc);
  thunkAPI.dispatch(bookmarksIndexReceived(bookmarksIndex));
  thunkAPI.dispatch(fetchCollectionsOfIndex(bookmarksIndex));
});

export const fetchCollectionsOfIndex = createAsyncThunk<
  void,
  BookmarksIndex | undefined | null,
  { state: State }
>('bookmarks/fetchCollectionsOfIndex', async (bookmarksIndex, thunkAPI) => {
  bookmarksIndex = bookmarksIndex || selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  const collectionDocs = await Promise.all(
    Object.values(bookmarksIndex as BookmarksIndex).map((collectionDocID) =>
      loadDocument(collectionDocID)
    )
  );

  const supportedCollectionDocs = collectionDocs.filter((collectionDoc) =>
    [schemas.Bookmarks, schemas.BookmarksLists].includes(
      collectionDoc.metadata.schema || ''
    )
  );

  const collections = supportedCollectionDocs.map((collectionDoc) => {
    const docID = collectionDoc.id.toUrl();
    const schemaDocID = collectionDoc.metadata.schema;
    const indexKey = Object.keys(bookmarksIndex as BookmarksIndex).find(
      (key) => (bookmarksIndex as BookmarksIndex)[key] === docID
    );

    const collection = {
      docID,
      indexKey,
      schemaDocID,
    };

    const schemaName = getSchemaNameByDocID(schemaDocID);

    return schemaName === 'Bookmarks'
      ? {
          ...collection,
          bookmarks: collectionDoc.content,
        }
      : {
          ...collection,
          bookmarksLists: collectionDoc.content,
        };
  });

  thunkAPI.dispatch(anyCollectionsReceived(collections));
});

export const fetchBookmarksOfCollection = createAsyncThunk<
  void,
  string,
  { state: State }
>(
  'bookmarks/fetchBookmarksOfCollection',
  async (bookmarksCollectionDocID, thunkAPI) => {
    const bookmarksCollection = selectBookmarksCollectionByDocID(
      thunkAPI.getState(),
      bookmarksCollectionDocID
    );

    if (!bookmarksCollection) {
      thunkAPI.rejectWithValue(
        new Error('No BookmarksCollection with given docID exists')
      );
    }

    const bookmarkDocs = await Promise.all(
      (bookmarksCollection as BookmarksCollection).bookmarks.map(
        (bookmarkDocID) => loadDocument(bookmarkDocID)
      )
    );
    const bookmarks = bookmarkDocs.map((doc) => flattenDoc(doc));
    thunkAPI.dispatch(bookmarksReceived(bookmarks));
  }
);

export const addBookmark = createAsyncThunk<
  void,
  {
    bookmarkToAdd: Partial<BookmarkDocContent>;
    bookmarksIndexKey: 'public' | 'private' | 'unsorted';
  },
  { state: State }
>('bookmarks/add', async (payload, thunkAPI) => {
  const authorDID = selectProfileDID(thunkAPI.getState());
  const bookmarksIndex = selectBookmarksIndex(thunkAPI.getState());

  if (!bookmarksIndex) {
    thunkAPI.rejectWithValue(new Error('BookmarksIndexDoc not loaded'));
  }

  const bookmarksIndexKeyDocID = (bookmarksIndex as BookmarksIndex)[
    payload.bookmarksIndexKey
  ];

  if (!bookmarksIndexKeyDocID) {
    thunkAPI.rejectWithValue(new Error('Provided BookmarksIndex key invalid'));
  }

  const addedBookmarkDocID = await createBookmarkDoc(
    enrichPartialBookmark({
      ...payload.bookmarkToAdd,
      author: authorDID as string,
    })
  );

  const updatedBookmarksDoc = await addBookmarkDocToBookmarksDoc(
    addedBookmarkDocID,
    bookmarksIndexKeyDocID
  );

  const updatedBookmarksCollection = {
    docID: updatedBookmarksDoc.id.toUrl(),
    indexKey: payload.bookmarksIndexKey,
    schemaDocID: updatedBookmarksDoc.metadata.schema,
    bookmarks: updatedBookmarksDoc.content,
  };
  thunkAPI.dispatch(bookmarksCollectionUpdated(updatedBookmarksCollection));
});

export default {
  bootstrapBookmarks,
  fetchCollectionsOfIndex,
  fetchBookmarksOfCollection,
  addBookmark,
};
