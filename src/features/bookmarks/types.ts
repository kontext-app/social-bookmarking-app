export type DefaultBookmarksIndexKeys =
  | 'unsorted'
  | 'public'
  | 'private'
  | 'lists';

export type BookmarksIndex = {
  unsorted: BookmarksDoc;
  public: BookmarksDoc;
  private: BookmarksDoc;
  lists: BookmarksListsDoc;
};

export type BookmarksIndexDoc = {
  unsorted: string;
  public: string;
  private: string;
  lists: string;
};

export type Bookmark = {
  url: string;
  title: string;
  description: string;
  highlight: string;
  creationDate: string;
};

export type BookmarksDoc = Array<Bookmark>;

export type BookmarksData = {
  [docID: string]: BookmarksDoc;
};

export type BookmarksList = {
  title: string;
  description: string;
  creationDate: string;
  bookmarks: Array<Bookmark>;
};

export type BookmarksListsDoc = Array<BookmarksList>;

export type BookmarksListsData = {
  [docID: string]: BookmarksListsDoc;
};
