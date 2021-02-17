import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ListBox } from 'features/lists/components/ListBox';

import { selectListByDocID } from 'features/lists/selectors';

import { State } from 'app/store';

type Props = {
  listDocID: string;
};

export function ListBoxContainer(props: Props): JSX.Element | null {
  const history = useHistory();
  const list = useSelector((state: State) =>
    selectListByDocID(state, props.listDocID)
  );

  if (!list) {
    return null;
  }

  return (
    <ListBox
      {...list}
      numOfItems={list.items.length}
      creationDateISO={list.creationDate}
      onClick={() =>
        history.push(`/list/${props.listDocID.replace('ceramic://', '')}`)
      }
    />
  );
}
