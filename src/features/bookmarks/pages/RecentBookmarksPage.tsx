import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { SearchBar } from 'features/bookmarks/components/SearchBar';
import { CuratedBookmarksFeedContainer } from 'features/bookmarks/containers/CuratedBookmarksFeed';

import { searchInputSet } from 'features/bookmarks/bookmarksSlice';
import { fetchRecentCuratedBookmarks } from 'features/bookmarks/asyncThunks';
import { selectRecentCuratedBookmarkDocIDs } from 'features/curatedDocs/selectors';

import { State } from 'app/store';

export function RecentBookmarksPage(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');

  const dispatch = useDispatch();
  const recentCuratedBookmarkDocIDs = useSelector((state: State) =>
    selectRecentCuratedBookmarkDocIDs(state)
  );

  useEffect(() => {
    dispatch(fetchRecentCuratedBookmarks());
  }, [dispatch]);

  useEffect(() => {
    if (!searchInput) {
      dispatch(searchInputSet(searchInput));
    }
  }, [searchInput]);

  const handleSearch = () => {
    dispatch(searchInputSet(searchInput));
  };

  return (
    <PageLayout title="Most recent public bookmarks">
      <SearchBar
        onChangeSearchInput={setSearchInput}
        searchInput={searchInput}
        onClickSearch={handleSearch}
      />
      <CuratedBookmarksFeedContainer
        bookmarkDocIDs={recentCuratedBookmarkDocIDs}
      />
    </PageLayout>
  );
}
