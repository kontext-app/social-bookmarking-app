import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import ThreeIdDidProvider from '3id-did-provider';
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect';
import { IDX } from '@ceramicstudio/idx';
import { definitions, schemas } from '@ceramicstudio/idx-constants';
import { DID } from 'dids';

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
import type { BasicProfileDocContent } from 'features/profile/types';
import type { Doctype } from '@ceramicnetwork/common';
import type { EthereumProvider } from '3id-connect';

let idx: IDX;
let ceramic: CeramicClient;

function initializeCeramic(): void {
  ceramic = new CeramicClient(
    process.env.REACT_APP_CERAMIC_API_HOST ||
      'https://ceramic-dev.3boxlabs.com',
    { docSyncEnabled: false }
  );
}

function initializeIDX(ceramic: CeramicClient): void {
  idx = new IDX({
    // @ts-ignore
    ceramic,
    aliases: {
      ...definitions,
      ...PUBLISHED_DEFINITIONS,
    },
  });
}

export async function authenticateWithSeed(seed: Uint8Array): Promise<void> {
  initializeCeramic();

  const threeIdProvider = await ThreeIdDidProvider.create({
    // @ts-ignore
    ceramic,
    getPermission: async () => [],
    seed,
  });

  const didProvider = threeIdProvider.getDidProvider();
  const did = new DID({
    provider: didProvider,
    // @ts-ignore
    resolver: ThreeIdResolver.getResolver(ceramic),
  });
  await did.authenticate();

  await ceramic.setDIDProvider(didProvider);
  initializeIDX(ceramic);
}

export async function authenticateWithEthereum(
  ethereumProvider: EthereumProvider,
  address: string
): Promise<void> {
  initializeCeramic();

  const threeIdConnect = new ThreeIdConnect(
    process.env.REACT_APP_THREE_ID_CONNECT_HOST || 'https://app.3idconnect.org'
  );

  const ethereumAuthProvider = new EthereumAuthProvider(
    ethereumProvider,
    address
  );
  await threeIdConnect.connect(ethereumAuthProvider);

  const didProvider = await threeIdConnect.getDidProvider();
  const did = new DID({
    provider: didProvider,
    // @ts-ignore
    resolver: ThreeIdResolver.getResolver(ceramic),
  });
  console.log({ resolver: ThreeIdResolver.getResolver(ceramic) });
  await did.authenticate();

  await ceramic.setDIDProvider(didProvider);
  initializeIDX(ceramic);
}

export function isIDXAuthenticated(): boolean {
  if (!idx) {
    return false;
  }

  return idx.authenticated;
}

export function getDID(): string {
  return idx.id;
}

export async function loadDocument(docID: string): Promise<Doctype> {
  return idx.ceramic.loadDocument(docID, {});
}

export async function getBasicProfileDocContent(
  did?: string
): Promise<BasicProfileDocContent | null> {
  return idx.get<BasicProfileDocContent>('basicProfile', did);
}

export async function setBasicProfileDocContent(
  basicProfileDocContent: BasicProfileDocContent
): Promise<string> {
  const docID = await idx.set('basicProfile', basicProfileDocContent);
  return docID.toUrl();
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

  return bookmarksIndexDocID.toUrl();
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
  return id.toUrl();
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
  return id.toUrl();
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
  return id.toUrl();
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
