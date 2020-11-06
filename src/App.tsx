import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PopularBookmarksPage } from 'features/bookmarks/PopularBookmarksPage';
import { RecentBookmarksPage } from 'features/bookmarks/RecentBookmarksPage';
import { MyBookmarksPage } from 'features/bookmarks/MyBookmarksPage';
import { ProfilePage } from 'features/profile/ProfilePage';
import { LogInPage } from 'features/profile/LogInPage';

import { bootstrapApp } from 'app/asyncThunks';
import { getAppBootstrapStatus } from 'app/selectors';
import { LoadingStatus } from 'app/constants/enums';

export function App(): React.ReactElement {
  const dispatch = useDispatch();
  const appBootstrapStatus = useSelector(getAppBootstrapStatus);

  useEffect(() => {
    dispatch(bootstrapApp());
  }, [dispatch]);

  if (
    appBootstrapStatus === LoadingStatus.IDLE ||
    appBootstrapStatus === LoadingStatus.PENDING
  ) {
    return <div>Bootstrapping App...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <MyBookmarksPage />} />
        <Route exact path="/my" render={() => <MyBookmarksPage />} />
        <Route exact path="/popular" render={() => <PopularBookmarksPage />} />
        <Route exact path="/recent" render={() => <RecentBookmarksPage />} />
        <Route exact path="/profile" render={() => <ProfilePage />} />
        <Route exact path="/login" render={() => <LogInPage />} />
      </Switch>
    </Router>
  );
}

export default App;
