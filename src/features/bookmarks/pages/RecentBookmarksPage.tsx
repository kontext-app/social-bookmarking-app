import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { SearchBar } from 'features/bookmarks/components/SearchBar';
import { CuratedBookmarksFeedContainer } from 'features/bookmarks/containers/CuratedBookmarksFeed';

import {
  searchInputSet,
  increaseFeedEndIndex,
  resetFeedEndIndex,
} from 'features/bookmarks/bookmarksSlice';
import { fetchCuratedBookmarksDoc } from 'features/curatedDocs/asyncThunks';
import {
  selectRecentCuratedBookmarkDocIDs,
  selectCuratedDocsLoadingStatus,
} from 'features/curatedDocs/selectors';

import { useOnScreen } from 'app/hooks/useOnScreen';

import { State } from 'app/store';

export function RecentBookmarksPage(): JSX.Element {
  const dispatch = useDispatch();
  const loadMoreButtonRef = useRef(null);

  const isLoadMoreButtonRefOnScreen = useOnScreen(loadMoreButtonRef);

  const recentCuratedBookmarkDocIDs = useSelector((state: State) =>
    selectRecentCuratedBookmarkDocIDs(state)
  );
  const curatedDocsLoadingStatus = useSelector((state: State) =>
    selectCuratedDocsLoadingStatus(state)
  );

  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    dispatch(resetFeedEndIndex());
    dispatch(fetchCuratedBookmarksDoc());
  }, []);

  useEffect(() => {
    if (!searchInput) {
      dispatch(searchInputSet(searchInput));
    }
  }, [searchInput]);

  useEffect(() => {
    if (
      curatedDocsLoadingStatus === 'fulfilled' &&
      isLoadMoreButtonRefOnScreen
    ) {
      dispatch(increaseFeedEndIndex());
    }
  }, [curatedDocsLoadingStatus, isLoadMoreButtonRefOnScreen]);

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
      <div ref={loadMoreButtonRef}>Loading more...</div>
    </PageLayout>
  );
}
