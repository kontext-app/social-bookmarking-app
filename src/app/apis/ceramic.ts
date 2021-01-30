import { apis, utils } from 'kontext-common';

import type { IDX } from '@ceramicstudio/idx';
import type { Doctype, CeramicApi } from '@ceramicnetwork/common';
import type { EthereumProvider } from '3id-connect';
import type {
  BasicProfileDocContent,
  BookmarksIndexDocContent,
  BookmarkDocContent,
  BookmarksDoc,
  RatingsIndexDocContent,
  RatingDocContent,
} from 'kontext-common';

let idx: IDX;
let ceramic: CeramicApi;

function initializeCeramic(): void {
  // @ts-ignore
  ceramic = apis.ceramic.createCeramic(process.env.REACT_APP_CERAMIC_API_HOST);
}

function initializeIDX(ceramic: CeramicApi): void {
  // @ts-ignore
  idx = apis.idx.createIDX(ceramic);
}

export async function authenticateWithSeed(seed: Uint8Array): Promise<void> {
  initializeCeramic();

  const didProvider = await apis.threeId.createThreeIdFromSeed({
    // @ts-ignore
    ceramic,
    seed,
  });
  // @ts-ignore
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
    // @ts-ignore
    ceramic,
    ethereumProvider,
    address,
  });
  // @ts-ignore
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

export async function addEmptyBookmarksDocToIndexDoc(
  did: string,
  indexKey: string
): Promise<string> {
  return apis.bookmarks.addEmptyBookmarksDocToIndexDoc(idx, { did, indexKey });
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

export async function addManyBookmarkDocsToBookmarksDoc(
  bookmarkDocIDs: string[],
  bookmarksDocID: string
): Promise<BookmarksDoc> {
  return apis.bookmarks.addManyBookmarkDocsToBookmarksDoc(idx, {
    bookmarkDocIDs,
    bookmarksDocID,
  });
}

//#region Ratings

export async function hasRatingsIndex(did?: string): Promise<boolean> {
  return apis.ratings.hasRatingsIndex(idx, did);
}

export async function setDefaultRatingsIndex(): Promise<string> {
  return apis.ratings.setDefaultRatingsIndex(idx);
}

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
