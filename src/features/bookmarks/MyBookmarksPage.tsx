import React from 'react';

import { PageLayout } from 'app/components/PageLayout';
import { BookmarksFeed } from './BookmarksFeed';

export function MyBookmarksPage() {
  return (
    <PageLayout>
      <BookmarksFeed bookmarks={[{}, {}, {}, {}]} />
    </PageLayout>
  );
}
