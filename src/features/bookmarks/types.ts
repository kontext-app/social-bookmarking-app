import type { Doctype } from '@ceramicnetwork/ceramic-common';

export interface CeramicDoc<T> extends Doctype {
  content: T;
}

export type BookmarksIndexDocContent = {
  unsorted: string;
  public: string;
  private: string;
  [key: string]: string;
};

export type BookmarksIndex = BookmarksIndexDocContent & {
  docID: string;
};

export type BookmarksIndexDoc = CeramicDoc<BookmarksIndexDocContent>;

export type BookmarksIndexData = {
  [docID: string]: BookmarksIndex;
};

export type BookmarkDocContent = {
  url: string;
  title: string;
  author: string;
  description: string;
  highlightedText: string;
  creationDate: string;
};

export type BookmarkDoc = CeramicDoc<BookmarkDocContent>;

export type BookmarksDocContent = Array<string>;

export type BookmarksDoc = CeramicDoc<BookmarksDocContent>;

export type BookmarksListDocContent = {
  title: string;
  author: string;
  description: string;
  creationDate: string;
  bookmarks: Array<string>;
};

export type BookmarksListDoc = CeramicDoc<BookmarksListDocContent>;

export type BookmarksListsDocContent = Array<string>;

export type BookmarksListsDoc = CeramicDoc<BookmarksListsDocContent>;

export type BookmarkData = {
  [docID: string]: BookmarkDoc;
};

export type BookmarksData = {
  [docID: string]: BookmarksDoc;
};

export type BookmarksListData = {
  [docID: string]: BookmarksListDoc;
};

export type BookmarksListsData = {
  [docID: string]: BookmarksListsDoc;
};
