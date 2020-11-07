import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';
import { BookmarksFeed } from '../components/BookmarksFeed';

import { bootstrapBookmarks } from '../asyncThunks';
import { getProfileDID } from 'features/profile/selectors';

export function MyBookmarksPage() {
  const dispatch = useDispatch();
  const did = useSelector(getProfileDID);

  const handleClick = () => {
    if (typeof did === 'string') {
      dispatch(bootstrapBookmarks());
    }
  };

  return (
    <PageLayout>
      <Button onClick={handleClick}>Fetch</Button>
      <BookmarksFeed bookmarks={[{}, {}, {}, {}]} />
    </PageLayout>
  );
}
