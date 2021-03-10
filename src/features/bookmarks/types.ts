import type {
  BookmarksIndexDocContent,
  BookmarkDocContent,
} from 'kontext-common';

export type BookmarksIndex = BookmarksIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type Bookmark = BookmarkDocContent & {
  docID: string;
  schemaDocID?: string;
};
