import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';
import { InputWithLabel } from 'app/components/InputWithLabel';

import { addBookmark } from 'features/bookmarks/asyncThunks';
import { selectBookmarksLoadingStatus } from 'features/bookmarks/selectors';
import { LoadingStatus } from 'app/constants/enums';

import type { Bookmark } from 'features/bookmarks/types';

export function AddBookmarkPage(): JSX.Element {
  const dispatch = useDispatch();
  const bookmarksLoadingStatus = useSelector(selectBookmarksLoadingStatus);

  const [bookmark, setBookmark] = useState<Partial<Bookmark>>({
    url: '',
    title: '',
    description: '',
  });

  const areBookmarkInputValuesValid = areInputValuesValid(bookmark);
  const isLoading = bookmarksLoadingStatus === LoadingStatus.PENDING;

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
      // TODO: Enable selection of other index key
      dispatch(
        addBookmark({ bookmarkToAdd: bookmark, bookmarksIndexKey: 'unsorted' })
      );
    }
  };

  return (
    <PageLayout>
      <h1>Add a bookmark</h1>
      <InputWithLabel
        label="url"
        value={bookmark.url}
        loading={isLoading}
        onChange={handleUrlChange}
      />
      <InputWithLabel
        label="title"
        value={bookmark.title}
        loading={isLoading}
        onChange={handleTitleChange}
      />
      <InputWithLabel
        label="description"
        value={bookmark.description}
        loading={isLoading}
        onChange={handleDescriptionChange}
      />
      <Button
        disabled={!areBookmarkInputValuesValid}
        loading={isLoading}
        onClick={handleClickAdd}
      >
        Add
      </Button>
    </PageLayout>
  );
}

// TODO: Add url validation
function areInputValuesValid(inputValues: Partial<Bookmark>): boolean {
  const { url = '', description = '', title = '' } = inputValues;
  return url !== '' && description !== '' && title !== '';
}

export default AddBookmarkPage;
