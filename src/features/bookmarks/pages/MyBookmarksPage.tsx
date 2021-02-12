import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';

import { fetchBookmarksIndex } from 'features/bookmarks/asyncThunks';
import { selectProfileDID } from 'features/profile/selectors';

export function MyBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const did = useSelector(selectProfileDID);

  const handleClick = () => {
    if (typeof did === 'string') {
      dispatch(fetchBookmarksIndex());
    }
  };

  return (
    <PageLayout>
      <Button onClick={handleClick}>Fetch</Button>
      {/* <BookmarksFeed bookmarks={[{}, {}, {}, {}]} /> */}
    </PageLayout>
  );
}
