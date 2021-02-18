import {
  apis,
  ListDocContent,
  ListsIndexDocContent,
  utils,
  constants,
} from 'kontext-common';
import CeramicClient from '@ceramicnetwork/http-client';

import type { IDX } from '@ceramicstudio/idx';
import type { Doctype, CeramicApi } from '@ceramicnetwork/common';
import type { EthereumProvider } from '3id-connect';
import type {
  BasicProfileDocContent,
  BookmarksIndexDocContent,
  BookmarkDocContent,
  RatingsIndexDocContent,
  RatingDocContent,
} from 'kontext-common';

let idx: IDX;
let ceramic: CeramicClient;

export function initializeCeramicAndIDX(): void {
  initializeCeramic();
  initializeIDX(ceramic);
}

//#region threeId

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

//#endregion

//#region idx

function initializeIDX(ceramic: CeramicApi): void {
  idx = apis.idx.createIDX(ceramic);
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

export function hasDefaultKontextIDX(): Promise<boolean> {
  return apis.idx.hasDefaultKontextIDX(idx);
}

export function setDefaultKontextIDX(): Promise<{
  bookmarksIndexDocID: string;
  listsIndexDocID: string;
  ratingsIndexDocID: string;
}> {
  return apis.idx.setDefaultKontextIDX(idx);
}

//#endregion

//#region ceramic

function initializeCeramic(): void {
  ceramic = apis.ceramic.createCeramic(process.env.REACT_APP_CERAMIC_API_HOST);
}

export async function loadDocument(docID: string): Promise<Doctype> {
  return ceramic.loadDocument(docID);
}

//#endregion

//#region profile

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

//#endregion

//#region bookmarks

export async function getBookmarksIndexDocID(
  did?: string
): Promise<string | null> {
  return apis.bookmarks.getBookmarksIndexDocID(idx, did);
}

export async function getBookmarksIndexDocContent(
  did?: string
): Promise<BookmarksIndexDocContent | null> {
  return apis.bookmarks.getBookmarksIndexDocContent(idx, did);
}

export async function addEmptyBookmarksIndexKey(
  did: string,
  indexKey: string
): Promise<string> {
  return apis.bookmarks.addEmptyBookmarksIndexKey(idx, { did, indexKey });
}

export async function createBookmarkDoc(
  bookmarkToAdd: BookmarkDocContent
): Promise<string> {
  return apis.bookmarks.createBookmarkDoc(idx, bookmarkToAdd);
}

export async function addBookmarkDocToBookmarksIndex(
  bookmarkDocID: string,
  bookmarksIndexKey: string
): Promise<BookmarksIndexDocContent> {
  return apis.bookmarks.addBookmarkDocToBookmarksIndex(idx, {
    bookmarkDocID,
    bookmarksIndexKey,
  });
}

export async function addManyBookmarkDocsToBookmarksIndex(
  bookmarkDocIDs: string[],
  bookmarksIndexKey: string
): Promise<BookmarksIndexDocContent> {
  return apis.bookmarks.addManyBookmarkDocsToBookmarksIndex(idx, {
    bookmarkDocIDs,
    bookmarksIndexKey,
  });
}

export async function isDocIDBookmark(docID: string): Promise<boolean> {
  const doc = await loadDocument(docID);

  return (
    doc.metadata.schema?.replace('ceramic://', '') ===
    constants.schemas.Bookmark.replace('ceramic://', '')
  );
}

//#endregion

//#region lists

export async function getListsIndexDocID(did?: string): Promise<string | null> {
  return apis.lists.getListsIndexDocID(idx, did);
}

export async function getListsIndexDocContent(
  did?: string
): Promise<ListsIndexDocContent | null> {
  return apis.lists.getListsIndexDocContent(idx, did);
}

export async function addEmptyListsIndexKey(
  did: string,
  indexKey: string
): Promise<string> {
  return apis.lists.addEmptyListsIndexKey(idx, { did, indexKey });
}

export async function createListDoc(
  listToCreate: ListDocContent
): Promise<string> {
  return apis.lists.createListDoc(idx, listToCreate);
}

export async function addListDocToListsIndex(
  listDocID: string,
  listsIndexKey: string
): Promise<ListsIndexDocContent> {
  return apis.lists.addListDocToListsIndex(idx, {
    listDocID,
    listsIndexKey,
  });
}

export async function addItemToListDoc(
  itemDocID: string,
  listDocID: string
): Promise<ListDocContent> {
  return apis.lists.addItemToListDoc(idx, {
    itemDocID,
    listDocID,
  });
}

export async function isDocIDList(docID: string): Promise<boolean> {
  const doc = await loadDocument(docID);

  return (
    doc.metadata.schema?.replace('ceramic://', '') ===
    constants.schemas.List.replace('ceramic://', '')
  );
}

//#region ratings

export async function getRatingsIndexDocID(
  did?: string
): Promise<string | null> {
  return apis.ratings.getRatingsIndexDocID(idx, did);
}

export async function createRatingDoc(
  ratingToCreate: RatingDocContent
): Promise<string> {
  return apis.ratings.createRatingDoc(idx, ratingToCreate);
}

export async function addRatingDocToRatingsIndex(
  ratingDocID: string,
  ratingsIndexKey: string
): Promise<RatingsIndexDocContent> {
  return apis.ratings.addRatingDocToRatingsIndex(idx, {
    ratingDocID,
    ratingsIndexKey,
  });
}

export async function addManyRatingDocsToRatingsIndex(
  ratingDocIDs: string[],
  ratingsIndexKey: string
): Promise<RatingsIndexDocContent> {
  return apis.ratings.addManyRatingDocsToRatingsIndex(idx, {
    ratingDocIDs,
    ratingsIndexKey,
  });
}

export async function addEmptyRatingsIndexKey(
  did: string,
  indexKey: string
): Promise<string> {
  return apis.ratings.addEmptyRatingsIndexKey(idx, { did, indexKey });
}

//#endregion

export function getSchemaNameByDocID(docID?: string): string | null {
  return utils.schema.getSchemaNameByDocID(docID);
}
