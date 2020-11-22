import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PageLayout } from 'app/components/PageLayout';
import { InputWithLabel } from 'app/components/InputWithLabel';
import { Button } from 'app/components/Button';

import {
  selectProfileDID,
  selectProfileIsAuthenticated,
  selectProfileDoc,
  selectProfileLoadingStatus,
} from 'features/profile/selectors';
import {
  fetchProfileDocByDID,
  updateProfile,
} from 'features/profile/asyncThunks';
import { BasicProfileDocContent } from './types';
import { LoadingStatus } from 'app/constants/enums';

const emptyProfileDoc = {};

export function ProfilePage(): JSX.Element {
  const dispatch = useDispatch();
  const did = useSelector(selectProfileDID);
  const profileLoadingStatus = useSelector(selectProfileLoadingStatus);
  const profileDoc = useSelector(selectProfileDoc) || emptyProfileDoc;
  const isAuthenticated = useSelector(selectProfileIsAuthenticated);
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/login');
    } else if (typeof did === 'string') {
      dispatch(fetchProfileDocByDID(did));
    }
  }, [history, isAuthenticated, did, dispatch]);

  useEffect(() => {
    setName(profileDoc.name);
    setDescription(profileDoc.description);
    setImage(profileDoc.image);
  }, [profileDoc]);

  const handleChangeText = (key: string, changedText: string) => {
    if (key === 'name') {
      setName(changedText);
    }
    if (key === 'description') {
      setDescription(changedText);
    }
    if (key === 'image') {
      setImage(changedText);
    }
  };

  const didChange = didValuesChange(profileDoc, { name, description, image });

  const handleClickSave = () => {
    if (didChange) {
      dispatch(
        updateProfile({
          name,
          description,
          image,
        })
      );
    }
  };

  const isLoading =
    profileLoadingStatus === LoadingStatus.IDLE ||
    profileLoadingStatus === LoadingStatus.PENDING;

  return (
    <PageLayout>
      {isAuthenticated && (
        <div className="p-3">
          <h3 className="mb-3">Hello{name ? `, ${name} ` : ' '}👋</h3>
          <InputWithLabel label="Your DID" value={did || ''} disabled />
          <InputWithLabel
            label="Your Name"
            value={name}
            onChange={(event) => handleChangeText('name', event.target.value)}
            disabled={isLoading}
          />
          <InputWithLabel
            label="Description"
            value={description}
            onChange={(event) =>
              handleChangeText('description', event.target.value)
            }
            disabled={isLoading}
          />
          <InputWithLabel
            label="Image URL"
            value={image}
            onChange={(event) => handleChangeText('image', event.target.value)}
            disabled={isLoading}
          />
          <Button
            className="mt-3"
            onClick={handleClickSave}
            loading={isLoading}
          >
            {isLoading && didChange ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </PageLayout>
  );
}

function didValuesChange(
  prevBasicProfileDocContent: BasicProfileDocContent,
  nextBasicProfileDocContent: BasicProfileDocContent
): boolean {
  return (
    prevBasicProfileDocContent.name !== nextBasicProfileDocContent.name ||
    prevBasicProfileDocContent.description !==
      nextBasicProfileDocContent.description ||
    prevBasicProfileDocContent.image !== nextBasicProfileDocContent.image
  );
}

export default ProfilePage;
