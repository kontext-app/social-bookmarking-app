import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import { camelCase } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast, ToastContainer } from 'react-toastify';

import { Button } from 'app/components/Button';

import { selectBookmarksIndex } from 'features/bookmarks/selectors';
import {
  addEmptyBookmarksIndexKey,
  addManyBookmarks,
} from 'features/bookmarks/asyncThunks';
import { selectRatingsIndex } from 'features/ratings/selectors';
import {
  addIndexKeyToRatingsIndex,
  addManyRatings,
} from 'features/ratings/asyncThunks';
import { isIMDBRatingValid } from 'features/import/utils';
import { RatingsImportSource } from 'app/constants';

export function ImportFromIMDB(): JSX.Element {
  const dispatch = useDispatch();
  const [isImporting, setIsImporting] = useState(false);
  const bookmarksIndex = useSelector(selectBookmarksIndex);
  const ratingsIndex = useSelector(selectRatingsIndex);
  const [validIMDBRatings, setValidIMDBRatings] = useState<any[]>([]);

  const handleOnDrop = (
    ratings: {
      data: any;
      errors: any[];
    }[]
  ) => {
    const validRatings = ratings
      .filter(
        (rating) => rating.errors.length === 0 && isIMDBRatingValid(rating.data)
      )
      .map((validRating) => validRating.data);
    setValidIMDBRatings(validRatings);
  };

  const handleOnError = (err: any) => {
    console.log(err);
    toast.error(
      'Whoops something went wrong while importing your IMDb ratings 😥'
    );
  };

  const handleOnRemoveFile = () => {
    setValidIMDBRatings([]);
  };

  const handleClickImport = async () => {
    setIsImporting(true);
    try {
      if (!bookmarksIndex || !bookmarksIndex[RatingsImportSource.IMDB]) {
        const resultAction = await dispatch(
          addEmptyBookmarksIndexKey({ indexKey: RatingsImportSource.IMDB })
        );

        const unwrappedResult = await unwrapResult(resultAction as any);

        if (typeof unwrappedResult === 'object' && unwrappedResult?.error) {
          throw unwrappedResult.error;
        }
      }

      const bookmarksToAdd = validIMDBRatings.map((rating) => ({
        url: rating.url,
        title: rating.title,
        description: `IMDb import of "${rating.title}"`,
      }));
      const addManyBookmarksResultAction = await dispatch(
        addManyBookmarks({
          bookmarksToAdd,
          bookmarksIndexKey: RatingsImportSource.IMDB,
        })
      );
      const addedBookmarkDocIDs = await unwrapResult(
        addManyBookmarksResultAction as any
      );

      if (!ratingsIndex || !ratingsIndex[RatingsImportSource.IMDB]) {
        await dispatch(
          addIndexKeyToRatingsIndex({ indexKey: RatingsImportSource.IMDB })
        );
      }

      const ratingsToAdd = addedBookmarkDocIDs.map(
        (addedBookmarkDocID: string, i: number) => ({
          ratedDocId: addedBookmarkDocID,
          bestRating: 10,
          worstRating: 0,
          rating: Number(validIMDBRatings[i].yourRating),
        })
      );
      await dispatch(
        addManyRatings({
          ratingsToAdd,
          ratingsIndexKey: RatingsImportSource.IMDB,
        })
      );
      toast.success(`Successfully imported your IMDb ratings 🎊`);
    } catch (error) {
      console.log(error);
      toast.error(
        'Whoops something went wrong while importing your IMDb ratings 😥'
      );
    } finally {
      setIsImporting(false);
    }
  };

  const isImportDataValid = validIMDBRatings.length > 0;

  return (
    <div className="p-2">
      <ToastContainer />
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        addRemoveButton
        removeButtonColor="#659cef"
        onRemoveFile={handleOnRemoveFile}
        config={{
          header: true,
          transformHeader: (header: string) => camelCase(header),
        }}
      >
        <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      <Button
        className="mt-2"
        disabled={!isImportDataValid || isImporting}
        onClick={handleClickImport}
      >
        {isImporting
          ? `Importing ${validIMDBRatings.length} Rating/s...`
          : 'Import Ratings'}
      </Button>
    </div>
  );
}
