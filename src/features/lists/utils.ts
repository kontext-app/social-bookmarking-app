import type { ListDocContent } from 'kontext-common';

export function enrichPartialList(
  partialList: Partial<ListDocContent>
): ListDocContent {
  const { description = '', title = '', author = '', items = [] } = partialList;

  return {
    title,
    author,
    description,
    creationDate: new Date().toISOString(),
    items,
  };
}
