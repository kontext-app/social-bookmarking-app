import type { Bookmark } from 'features/bookmarks/types';

export function enrichPartialBookmark(
  partialBookmark: Partial<Bookmark>
): Bookmark {
  const { url = '', description = '', title = '' } = partialBookmark;

  return {
    url,
    title,
    description,
    highlight: '',
    creationDate: new Date().toISOString(),
  };
}
