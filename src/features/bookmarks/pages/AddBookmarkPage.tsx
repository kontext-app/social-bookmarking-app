import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enums } from 'kontext-common';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';
import { InputWithLabel } from 'app/components/InputWithLabel';
import { SwitchWithLabel } from 'app/components/SwitchWithLabel';

import { addBookmark } from 'features/bookmarks/asyncThunks';
import { selectBookmarksLoadingStatus } from 'features/bookmarks/selectors';

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
      <div className="flex justify-center">
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
        Add
      </Button>
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
