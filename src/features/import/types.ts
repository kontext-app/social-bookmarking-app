export type IMDbRatingFromCSV = {
  dateRated: string;
  directors: string;
  genres: string;
  imDbRating: string;
  numVotes: string;
  releaseDate: string;
  runtimeMins: string;
  title: string;
  titleType: string;
  url: string;
  year: string;
  yourRating: string;
};

export type ImportType = 'imdb';

export type BaseImportData = {
  url: string;
  title: string;
  rating: string;
};

export type ImportData = {
  type: ImportType;
  data: BaseImportData;
};
