import type { RatingsIndexDocContent, RatingDocContent } from 'kontext-common';

export type RatingsIndex = RatingsIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type Rating = RatingDocContent & {
  docID: string;
  schemaDocID?: string;
};
