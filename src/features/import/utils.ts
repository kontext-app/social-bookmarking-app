export function isIMDBRatingValid(imdbRating: any): boolean {
  return imdbRating.url && imdbRating.title && imdbRating.yourRating;
}
