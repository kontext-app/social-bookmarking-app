import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';

import { SidebarLeftContainer } from 'app/containers/SidebarLeft';
import { PopularBookmarksPage } from 'features/bookmarks/pages/PopularBookmarksPage';
import { RecentBookmarksPage } from 'features/bookmarks/pages/RecentBookmarksPage';
import { MyBookmarksPage } from 'features/bookmarks/pages/MyBookmarksPage';
import { AddBookmarkPage } from 'features/bookmarks/pages/AddBookmarkPage';
import { UnsortedBookmarksPage } from 'features/bookmarks/pages/UnsortedBookmarksPage';
import { ProfilePage } from 'features/profile/ProfilePage';
import { LogInPage } from 'features/profile/LogInPage';
import { ImportRatingsPage } from 'features/import/ImportRatingsPage';
import { IMDBRatingsPage } from 'features/import/IMDBRatingsPage';
import { AddListPage } from 'features/lists/pages/AddListPage';
import { UnsortedListsPage } from 'features/lists/pages/UnsortedListsPage';

import { bootstrapApp } from 'app/asyncThunks';
import { getAppBootstrapStatus } from 'app/selectors';

export function App(): JSX.Element {
  const dispatch = useDispatch();
  const appBootstrapStatus = useSelector(getAppBootstrapStatus);

  useEffect(() => {
    dispatch(bootstrapApp());
  }, [dispatch]);

  if (
    appBootstrapStatus === enums.LoadingStatus.IDLE ||
    appBootstrapStatus === enums.LoadingStatus.PENDING
  ) {
    return <div>Bootstrapping App...</div>;
  }

  return (
    <Router>
      <div id="main" className="bg-gray-100 h-full">
        <SidebarLeftContainer />
        <Switch>
          <Route exact path="/" render={() => <MyBookmarksPage />} />
          <Route
            exact
            path="/my-bookmarks"
            render={() => <MyBookmarksPage />}
          />
          <Route
            exact
            path="/popular"
            render={() => <PopularBookmarksPage />}
          />
          <Route exact path="/recent" render={() => <RecentBookmarksPage />} />
          <Route
            exact
            path="/add-bookmark"
            render={() => <AddBookmarkPage />}
          />
          <Route
            exact
            path="/unsorted"
            render={() => <UnsortedBookmarksPage />}
          />
          <Route exact path="/profile" render={() => <ProfilePage />} />
          <Route exact path="/login" render={() => <LogInPage />} />
          <Route exact path="/import" render={() => <ImportRatingsPage />} />
          <Route exact path="/imdb" render={() => <IMDBRatingsPage />} />
          <Route exact path="/add-list" render={() => <AddListPage />} />
          <Route
            exact
            path="/lists/unsorted"
            render={() => <UnsortedListsPage />}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
