import React from 'react';

import { IMDBPostContainer } from 'features/import/containers/IMDBPost';

type Props = {
  imdbBookmarkDocIDs: string[];
};

export function IMDBFeed(props: Props): JSX.Element {
  return (
    <>
      {props.imdbBookmarkDocIDs.map((bookmarkDocID) => (
        <IMDBPostContainer
          key={String(bookmarkDocID)}
          docID={String(bookmarkDocID)}
        />
      ))}
    </>
  );
}
