import React from 'react';

import { PageLayout } from '../../app/PageLayout';
import { BookmarksFeed } from './BookmarksFeed';

export function MyBookmarksPage() {
  return (
    <PageLayout>
      <BookmarksFeed bookmarks={[{}, {}, {}, {}]} />
    </PageLayout>
  );
}
