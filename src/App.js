import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBar } from './app/NavBar';
import HomePage from './app/HomePage';
import { PopularBookmarksPage } from './features/bookmarks/PopularBookmarksPage';
import { RecentBookmarksPage } from './features/bookmarks/RecentBookmarksPage';
import { MyBookmarksPage } from './features/bookmarks/MyBookmarksPage';
import { ProfilePage } from './features/profile/ProfilePage';

function App() {
  return (
    <Router>
      {/*<NavBar />*/}
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/popular" render={() => <PopularBookmarksPage />} />
        <Route exact path="/recent" render={() => <RecentBookmarksPage />} />
        <Route exact path="/my" render={() => <MyBookmarksPage />} />
        <Route exact path="/profile" render={() => <ProfilePage />} />
      </Switch>
    </Router>
  );
}

export default App;
