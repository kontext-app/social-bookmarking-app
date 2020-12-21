import type { BookmarkDocContent, CeramicDoc } from 'kontext-common';

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

export function flattenDoc<T>(
  doc: CeramicDoc<T>
): T & { docID: string; schemaDocID?: string } {
  const { content, metadata, id } = doc;
  return {
    ...content,
    docID: id.toUrl(),
    schemaDocID: metadata.schema,
  };
}
