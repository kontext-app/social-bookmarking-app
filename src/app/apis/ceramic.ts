import { apis, utils } from 'kontext-common';

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
  return apis.profile.getBasicProfileDocContent(idx, did);
}

export async function setBasicProfileDocContent(
  basicProfileDocContent: BasicProfileDocContent
): Promise<string> {
  return apis.profile.setBasicProfileDocContent(idx, basicProfileDocContent);
}

export async function getBookmarksIndexDocID(
  did?: string
): Promise<string | null> {
  return apis.bookmarks.getBookmarksIndexDocID(idx, did);
}

export async function hasBookmarksIndex(did?: string): Promise<boolean> {
  return apis.bookmarks.hasBookmarksIndex(idx, did);
}

export async function getBookmarksIndexDocContent(
  did?: string
): Promise<BookmarksIndexDocContent | null> {
  return apis.bookmarks.getBookmarksIndexDocContent(idx, did);
}

export async function setDefaultBookmarksIndex(): Promise<string> {
  return apis.bookmarks.setDefaultBookmarksIndex(idx);
}

export async function createEmptyBookmarksDoc(): Promise<string> {
  return apis.bookmarks.createEmptyBookmarksDoc(idx);
}

export async function createEmptyBookmarksListsDoc(): Promise<string> {
  return apis.bookmarks.createEmptyBookmarksListsDoc(idx);
}

export async function createBookmarkDoc(
  bookmarkToAdd: BookmarkDocContent
): Promise<string> {
  return apis.bookmarks.createBookmarkDoc(idx, bookmarkToAdd);
}

export async function addBookmarkDocToBookmarksDoc(
  bookmarkDocID: string,
  bookmarksDocID: string
): Promise<BookmarksDoc> {
  return apis.bookmarks.addBookmarkDocToBookmarksDoc(idx, {
    bookmarkDocID,
    bookmarksDocID,
  });
}

export function getSchemaNameByDocID(docID?: string): string | null {
  return utils.schema.getSchemaNameByDocID(docID);
}
