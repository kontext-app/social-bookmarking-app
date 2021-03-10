import type {
  AggregatedRatingsIndexDocContent,
  AggregatedRatingsDocContent,
} from 'kontext-common';

export type AggregatedRatingsIndex = AggregatedRatingsIndexDocContent & {
  docID: string;
  schemaDocID?: string;
};

export type AggregatedRatings = AggregatedRatingsDocContent & {
  docID: string;
  indexKey: string;
  schemaDocID?: string;
};
