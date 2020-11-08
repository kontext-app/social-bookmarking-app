import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions, schemas } from '@ceramicstudio/idx-constants';

import {
  PUBLISHED_DEFINITIONS,
  PUBLISHED_SCHEMAS,
} from 'app/constants/definitions';
import { DefaultBookmarksIndexKeys } from 'app/constants/enums';

import type {
  BookmarkDocContent,
  BookmarksDoc,
  BookmarksIndexDocContent,
} from 'features/bookmarks/types';
import type { BasicProfile } from 'features/profile/types';
import type { Doctype } from '@ceramicnetwork/ceramic-common';

export let idx: IDXWeb;

export function createIDX(): void {
  idx = new IDXWeb({
    ceramic: process.env.REACT_APP_CERAMIC_API_HOST,
    connect: process.env.REACT_APP_THREE_ID_CONNECT_HOST,
    definitions: {
      ...definitions,
      ...PUBLISHED_DEFINITIONS,
    },
  });
}

export async function authenticateWithEthereum(
  ethereumProvider: unknown,
  address: string
): Promise<void> {
  await idx.authenticate({
    ethereum: {
      provider: ethereumProvider,
      address,
    },
  });
}

export function isIDXAuthenticated(): boolean {
  return idx.authenticated;
}

export function getDID(): string {
  return idx.id;
}

export function getDIDInstance(): any {
  return idx.did;
}

export async function loadDocument(docID: string): Promise<Doctype> {
  return idx.ceramic.loadDocument(docID);
}

export async function getProfileByDID(
  did?: string
): Promise<BasicProfile | null> {
  return idx.get<BasicProfile>('basicProfile', did);
}

export async function getIDXDocID(did?: string): Promise<string | null> {
  return idx.getIDXDocID(did);
}

export async function getBookmarksIndexDocID(
  did?: string
): Promise<string | null> {
  const idxDocContent = await idx.getIDXContent(did);

  if (!idxDocContent) {
    return null;
  }

  const bookmarksIndexDocID =
    idxDocContent[PUBLISHED_DEFINITIONS.BookmarksIndex];
  return bookmarksIndexDocID;
}

export async function hasBookmarksIndex(did?: string): Promise<boolean> {
  return idx.has('BookmarksIndex', did);
}

export async function getBookmarksIndexDocContent(
  did?: string
): Promise<BookmarksIndexDocContent | null> {
  return idx.get<BookmarksIndexDocContent>('BookmarksIndex', did);
}

export async function setDefaultBookmarksIndex(): Promise<string> {
  const defaultBookmarksIndexKeyToDocID: {
    [indexKey: string]: string;
  } = {};

  for (const defaultBookmarksIndexKey of Object.values(
    DefaultBookmarksIndexKeys
  )) {
    const docID =
      defaultBookmarksIndexKey === DefaultBookmarksIndexKeys.LISTS
        ? await createEmptyBookmarksListsDoc()
        : await createEmptyBookmarksDoc();
    defaultBookmarksIndexKeyToDocID[defaultBookmarksIndexKey] = docID;
  }

  await idx.remove('BookmarksIndex');
  const bookmarksIndexDocID = await idx.set(
    'BookmarksIndex',
    defaultBookmarksIndexKeyToDocID
  );

  return bookmarksIndexDocID.toUrl('base36');
}

export async function createEmptyBookmarksDoc(): Promise<string> {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: [],
    metadata: {
      schema: PUBLISHED_SCHEMAS.Bookmarks,
      controllers: [getDID()],
      tags: ['bookmarks'],
      isUnique: true,
    },
  });

  return id.toUrl('base36');
}

export async function createEmptyBookmarksListsDoc(): Promise<string> {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: [],
    metadata: {
      schema: PUBLISHED_SCHEMAS.BookmarksLists,
      controllers: [getDID()],
      tags: ['bookmarks'],
      isUnique: true,
    },
  });

  return id.toUrl('base36');
}

export async function createBookmarkDoc(
  bookmarkToAdd: BookmarkDocContent
): Promise<string> {
  const { id } = await idx.ceramic.createDocument('tile', {
    content: bookmarkToAdd,
    metadata: {
      schema: PUBLISHED_SCHEMAS.Bookmark,
      controllers: [getDID()],
      tags: ['bookmarks'],
    },
  });
  return id.toUrl('base36');
}

export async function addBookmarkDocToBookmarksDoc(
  bookmarkDocID: string,
  bookmarksDocID: string
): Promise<BookmarksDoc> {
  const bookmarksDoc = await idx.ceramic.loadDocument(bookmarksDocID);
  const existingBookmarkDocIDs = bookmarksDoc.content;
  const updatedBookmarkDocIDs = [bookmarkDocID, ...existingBookmarkDocIDs];

  await bookmarksDoc.change({
    content: updatedBookmarkDocIDs,
  });

  const updatedBookmarksDoc = await idx.ceramic.loadDocument(bookmarksDocID);
  return updatedBookmarksDoc;
}

export function getSchemaNameByDocID(docID?: string): string | null {
  if (!docID) {
    return null;
  }

  const allSchemas = {
    ...schemas,
    ...PUBLISHED_SCHEMAS,
  };

  const schemaDocIDIndex = Object.values(allSchemas).indexOf(docID);

  if (schemaDocIDIndex === -1) {
    return null;
  }

  return Object.keys(allSchemas)[schemaDocIDIndex];
}
