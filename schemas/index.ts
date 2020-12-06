import BookmarksIndex from './BookmarksIndex.json';
import Bookmark from './Bookmark.json';
import Bookmarks from './Bookmarks.json';
import BookmarksList from './BookmarksList.json';
import BookmarksLists from './BookmarksLists.json';
import publishedSchemas from './publishedSchemas.json';
import publishedDefinitions from './publishedDefinitions.json';

export const schemas: {
  [key: string]: any;
} = {
  Bookmark,
  Bookmarks,
  BookmarksIndex,
  BookmarksList,
  BookmarksLists,
  publishedSchemas,
  publishedDefinitions,
};

export default schemas;
