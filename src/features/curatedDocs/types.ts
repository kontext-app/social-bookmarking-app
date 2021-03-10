import type {
  CuratedDocsDocContent,
  CuratedDocsIndexDocContent,
} from 'kontext-common';

export type CuratedDocsIndex = CuratedDocsIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type CuratedDocs = CuratedDocsDocContent & {
  indexKey: string;
  docID: string;
  schemaDocID?: string;
};
