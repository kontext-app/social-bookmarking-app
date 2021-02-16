import type { ListDocContent, ListsIndexDocContent } from 'kontext-common';

export type ListsIndex = ListsIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type List = ListDocContent & {
  docID: string;
  schemaDocID?: string;
};
