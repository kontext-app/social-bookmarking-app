import React from 'react';
import { useSelector } from 'react-redux';

import { IMDBPost } from 'features/import/components/IMDBPost';

import { selectBookmarkByDocID } from 'features/bookmarks/selectors';
import { selectRatingsByRatedDocID } from 'features/ratings/selectors';
import { State } from 'app/store';

type Props = {
  docID: string;
};

export function IMDBPostContainer(props: Props): JSX.Element | null {
  const imdbBookmark = useSelector((state: State) =>
    selectBookmarkByDocID(state, props.docID)
  );
  const [imdbRating] = useSelector((state: State) =>
    selectRatingsByRatedDocID(state, props.docID)
  );

  console.log({ imdbBookmark, imdbRating, docID: props.docID });

  if (!imdbRating || !imdbBookmark) {
    return null;
  }

  return <IMDBPost {...imdbBookmark} {...imdbRating} />;
}
