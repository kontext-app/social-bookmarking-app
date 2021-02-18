import React from 'react';

import { ListBoxContainer } from 'features/lists/containers/ListBox';

type Props = {
  listDocIDs: string[];
};

export function ListsFeedContainer(props: Props): JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cold-3 xl:grid-cols-4">
      {props.listDocIDs.map((docID) => (
        <ListBoxContainer key={docID} listDocID={docID} />
      ))}
    </div>
  );
}
