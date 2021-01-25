import type {
  BookmarksIndexDocContent,
  BookmarkDocContent,
  BookmarksListDocContent,
} from 'kontext-common';

export type BookmarksIndex = BookmarksIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type Bookmark = BookmarkDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type BookmarksCollection = {
  docID: string;
  indexKey: string;
  bookmarks: Array<string>;
  schemaDocID?: string;
};

export type BookmarksList = BookmarksListDocContent & {
  docID: string;
  schemaDocID?: string;
};
export type BookmarksListsCollection = {
  docID: string;
  indexKey: string;
  bookmarksLists: Array<string>;
  schemaDocID?: string;
};

export type BookmarkFromRecommender = {
  docID: string;
  author: string;
  creationDate: string;
  description: string;
  url: string;
  title: string;
  upVotes: string[];
  downVotes: string[];
};
