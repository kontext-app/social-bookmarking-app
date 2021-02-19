import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';
import { Plus } from 'react-feather';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';
import { Input } from 'app/components/Input';
import { SwitchWithLabel } from 'app/components/SwitchWithLabel';
import { ImportSourceBox } from 'app/components/ImportSourceBox';

import { addBookmark } from 'features/bookmarks/asyncThunks';
import { selectBookmarksLoadingStatus } from 'features/bookmarks/selectors';

import imdbLogo from 'assets/logos/imdb.svg';
import netflixLogo from 'assets/logos/netflix.svg';
import doubanLogo from 'assets/logos/douban.svg';
import letterboxdLogo from 'assets/logos/letterboxd.svg';
import goodreadsLogo from 'assets/logos/goodreads.svg';
import googlemapsLogo from 'assets/logos/googlemaps.svg';
import yelpLogo from 'assets/logos/yelp.svg';
import twitterLogo from 'assets/logos/twitter.svg';
import youtubeLogo from 'assets/logos/youtube.svg';
import spotifyLogo from 'assets/logos/spotify.svg';

import type { BookmarkDocContent } from 'kontext-common';
import type { AppDispatch } from 'app/store';

export function AddBookmarkPage(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const bookmarksLoadingStatus = useSelector(selectBookmarksLoadingStatus);

  const [bookmark, setBookmark] = useState<Partial<BookmarkDocContent>>({
    url: '',
    title: '',
    description: '',
  });
  const [makePublic, setMakePublic] = useState<boolean>(false);

  const areBookmarkInputValuesValid = areInputValuesValid(bookmark);
  const isLoading = bookmarksLoadingStatus === enums.LoadingStatus.PENDING;

  const handleChange = useCallback(
    (property: 'url' | 'title' | 'description', changedValue: string) => {
      setBookmark((previousBookmark) => ({
        ...previousBookmark,
        [property]: changedValue,
      }));
    },
    [setBookmark]
  );

  const handleUrlChange = useCallback(
    (event) => handleChange('url', event.target.value),
    [handleChange]
  );

  const handleTitleChange = useCallback(
    (event) => handleChange('title', event.target.value),
    [handleChange]
  );

  const handleDescriptionChange = useCallback(
    (event) => handleChange('description', event.target.value),
    [handleChange]
  );

  const handleClickAdd = () => {
    if (areBookmarkInputValuesValid) {
      dispatch(
        addBookmark({
          bookmarkToAdd: bookmark,
          bookmarksIndexKey: 'unsorted',
          makePublic,
        })
      ).then(() =>
        setBookmark({
          url: '',
          title: '',
          description: '',
        })
      );
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-wrap -mx-5 overflow-hidden">
        <div className="my-5 px-5 w-1/4 overflow-hidden sm:w-1/3 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <h1 className="pb-4">Add a bookmark</h1>
          <Input
            placeholder="url"
            value={bookmark.url}
            loading={isLoading}
            onChange={handleUrlChange}
          />
          <Input
            placeholder="title"
            value={bookmark.title}
            loading={isLoading}
            onChange={handleTitleChange}
          />
          <Input
            placeholder="description"
            value={bookmark.description}
            loading={isLoading}
            onChange={handleDescriptionChange}
          />
          <div className="flex pb-4 pl-3">
            <SwitchWithLabel
              label="Make bookmark public?"
              enabled={makePublic}
              onChange={setMakePublic}
            />
          </div>
          <Button
            disabled={!areBookmarkInputValuesValid}
            loading={isLoading}
            onClick={handleClickAdd}
          >
            <Plus className="mr-1" />
            Add
          </Button>
        </div>

        <ImportSourceBox
          enabled={true}
          logo={imdbLogo}
          title="Import your rated movies from IMDB"
          link="/import"
        />

        <ImportSourceBox
          enabled={false}
          logo={netflixLogo}
          title="Netflix coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={doubanLogo}
          title="Douban coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={letterboxdLogo}
          title="Letterboxd coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={goodreadsLogo}
          title="Goodreads coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={googlemapsLogo}
          title="Google Maps coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={yelpLogo}
          title="Yelp coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={twitterLogo}
          title="Twitter coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={spotifyLogo}
          title="Spotify coming soon"
          link="/"
        />

        <ImportSourceBox
          enabled={false}
          logo={youtubeLogo}
          title="Youtube coming soon"
          link="/"
        />
      </div>
    </PageLayout>
  );
}

// TODO: Add url validation
function areInputValuesValid(
  inputValues: Partial<BookmarkDocContent>
): boolean {
  const { url = '', description = '', title = '' } = inputValues;
  return url !== '' && description !== '' && title !== '';
}

export default AddBookmarkPage;
