import { IDXWeb } from '@ceramicstudio/idx-web';
import { definitions } from '@ceramicstudio/idx-constants';

import {
  PUBLISHED_DEFINITIONS,
  PUBLISHED_SCHEMAS,
} from 'app/constants/definitions';

import type { BookmarksIndexDoc } from 'features/bookmarks/types';
import type { BasicProfile } from 'features/profile/types';

export const DefaultBookmarksIndexKeys = {
  UNSORTED: 'unsorted',
  PUBLIC: 'public',
  PRIVATE: 'private',
  LISTS: 'lists',
};

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

export async function getProfileByDID(
  did?: string
): Promise<BasicProfile | null> {
  return idx.get<BasicProfile>('basicProfile', did);
}

export async function getIDXDocID(did?: string): Promise<string | null> {
  return idx.getIDXDocID(did);
}

export async function hasBookmarksIndex(did?: string): Promise<boolean> {
  return idx.has('BookmarksIndex', did);
}

export async function getBookmarksIndexDocContent(
  did?: string
): Promise<BookmarksIndexDoc | null> {
  return idx.get<BookmarksIndexDoc>('BookmarksIndex', did);
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
    defaultBookmarksIndexKeyToDocID[
      defaultBookmarksIndexKey
    ] = `ceramic://${docID}`;
  }

  const bookmarksIndexDocID = await idx.set(
    'BookmarksIndex',
    defaultBookmarksIndexKeyToDocID
  );

  return String(bookmarksIndexDocID);
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

  return String(id);
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

  return String(id);
}
