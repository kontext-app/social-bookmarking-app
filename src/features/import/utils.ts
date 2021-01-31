import type { BookmarkDocContent, RatingDocContent } from 'kontext-common';
import type { IMDbRatingFromCSV } from './types';

export function isIMDBRatingValid(imdbRating: any): boolean {
  return imdbRating.url && imdbRating.title && imdbRating.yourRating;
}
