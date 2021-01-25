import type { RatingDocContent } from 'kontext-common';

export function enrichPartialRating(
  partialRating: Partial<RatingDocContent>
): RatingDocContent {
  const {
    bestRating = 1,
    worstRating = -1,
    ratedDocId = '',
    rating = 0,
    author = '',
  } = partialRating;

  return {
    bestRating,
    worstRating,
    rating,
    ratedDocId,
    author,
    creationDate: new Date().toISOString(),
  };
}
