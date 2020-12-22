import { apis, constants, definitions, schemas } from 'kontext-common';

import type { IDX } from '@ceramicstudio/idx';
import type { Doctype, CeramicApi } from '@ceramicnetwork/common';
import type { EthereumProvider } from '3id-connect';
import type {
  BasicProfileDocContent,
  BookmarksIndexDocContent,
  BookmarkDocContent,
  BookmarksDoc,
} from 'kontext-common';

let idx: IDX;
let ceramic: CeramicApi;

function initializeCeramic(): void {
  // @ts-ignore
  ceramic = apis.ceramic.createCeramic(process.env.REACT_APP_CERAMIC_API_HOST);
}

function initializeIDX(ceramic: CeramicApi): void {
  idx = apis.idx.createIDX(ceramic);
}

export async function authenticateWithSeed(seed: Uint8Array): Promise<void> {
  initializeCeramic();

  const didProvider = await apis.threeId.createThreeIdFromSeed({
    ceramic,
    seed,
  });
  await apis.threeId.authenticate({ ceramic, didProvider });

  initializeIDX(ceramic);
}

export async function authenticateWithEthereum(
  ethereumProvider: EthereumProvider,
  address: string
): Promise<void> {
  initializeCeramic();

  const didProvider = await apis.threeId.createThreeIdFromEthereumProvider({
    threeIdConnectHost: process.env.REACT_APP_THREE_ID_CONNECT_HOST,
    ceramic,
    ethereumProvider,
    address,
  });
  await apis.threeId.authenticate({ ceramic, didProvider });

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

  const bookmarksIndexDocID = idxDocContent[definitions.BookmarksIndex];
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
    constants.DefaultBookmarksIndexKeys
  )) {
    const docID =
      defaultBookmarksIndexKey === constants.DefaultBookmarksIndexKeys.LISTS
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
      schema: schemas.Bookmarks,
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
      schema: schemas.BookmarksLists,
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
      schema: schemas.Bookmark,
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

  const schemaDocIDIndex = Object.values(schemas).indexOf(docID);

  if (schemaDocIDIndex === -1) {
    return null;
  }

  return Object.keys(schemas)[schemaDocIDIndex];
}
