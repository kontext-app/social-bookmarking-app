import type { Doctype } from '@ceramicnetwork/common';

export interface CeramicDoc<T> extends Doctype {
  content: T;
}

export type BookmarksIndexDocContent = {
  unsorted: string;
  public: string;
  private: string;
  lists: string;
  [key: string]: string;
};

export type BookmarksIndex = BookmarksIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type BookmarksIndexDoc = CeramicDoc<BookmarksIndexDocContent>;

export type BookmarkDocContent = {
  url: string;
  title: string;
  author: string;
  description: string;
  highlightedText: string;
  creationDate: string;
};

export type BookmarkDoc = CeramicDoc<BookmarkDocContent>;

export type Bookmark = BookmarkDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type BookmarksDocContent = Array<string>;

export type BookmarksDoc = CeramicDoc<BookmarksDocContent>;

export type BookmarksCollection = {
  docID: string;
  indexKey: string;
  bookmarks: Array<string>;
  schemaDocID?: string;
};

export type BookmarksListDocContent = {
  title: string;
  author: string;
  description: string;
  creationDate: string;
  bookmarks: Array<string>;
};

export type BookmarksListDoc = CeramicDoc<BookmarksListDocContent>;

export type BookmarksList = BookmarksListDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type BookmarksListsDocContent = Array<string>;

export type BookmarksListsDoc = CeramicDoc<BookmarksListsDocContent>;

export type BookmarksListsCollection = {
  docID: string;
  indexKey: string;
  bookmarksLists: Array<string>;
  schemaDocID?: string;
};
