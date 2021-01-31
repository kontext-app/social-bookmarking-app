import React from 'react';

import { IMDBPostContainer } from 'features/import/containers/IMDBPost';

type Props = {
  imdbBookmarkDocIDs: string[];
};

export function IMDBFeed(props: Props): JSX.Element {
  return (
    <div className="mx-auto container">
      <div className="flex w-960 mx-auto">
        <div className="w-full">
          <div className="py-2">
            {props.imdbBookmarkDocIDs.map((bookmarkDocID) => (
              <IMDBPostContainer
                key={String(bookmarkDocID)}
                docID={String(bookmarkDocID)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
