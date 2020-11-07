import type { BookmarkDocContent } from 'features/bookmarks/types';

export function enrichPartialBookmark(
  partialBookmark: Partial<BookmarkDocContent>
): BookmarkDocContent {
  const {
    url = '',
    description = '',
    title = '',
    author = '',
  } = partialBookmark;

  return {
    url,
    title,
    author,
    description,
    highlightedText: '',
    creationDate: new Date().toISOString(),
  };
}
