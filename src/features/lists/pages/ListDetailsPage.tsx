import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';

import { BookmarksFeedContainer } from 'features/bookmarks/containers/BookmarksFeed';
import { AddBookmarkToListModal } from '../containers/AddBookmarkToListModal';

import { selectListByDocID } from '../selectors';
import { fetchListsByDocIDs } from '../asyncThunks';
import { fetchBookmarksByDocIDs } from 'features/bookmarks/asyncThunks';

import { State } from 'app/store';

export function ListDetailsPage(): JSX.Element | null {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const docID = `ceramic://${id}`;
  const list = useSelector((state: State) => selectListByDocID(state, docID));

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (list) {
      dispatch(fetchBookmarksByDocIDs({ docIDs: list.items }));
    } else {
      dispatch(fetchListsByDocIDs({ docIDs: [docID] }));
    }
  }, [list, dispatch, docID]);

  if (!list) {
    return null;
  }

  return (
    <PageLayout>
      <AddBookmarkToListModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        listDocID={docID}
      />
      <div className="p-2">
        <div className="text-base my-2">{list.title}</div>
        <div className="text-xs mb-2">
          {list.items.length} item/s<span className="mx-2">·</span>created by{' '}
          {list.author}{' '}
          {DateTime.fromISO(list.creationDate).toRelativeCalendar()}
        </div>
        <div className="text-sm">{list.description}</div>
      </div>
      <div className="flex flex-row gap-1 mb-4">
        <Button onClick={() => setIsModalOpen(true)}>
          Add bookmark to list
        </Button>
        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Copied to clipboard');
          }}
        >
          Copy list URL
        </Button>
      </div>
      <BookmarksFeedContainer bookmarkDocIDs={list.items} />
    </PageLayout>
  );
}
