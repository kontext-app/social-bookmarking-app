import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PageLayout } from 'app/components/PageLayout';
import { InputWithLabel } from 'app/components/InputWithLabel';
import { Button } from 'app/components/Button';

import {
  getProfileDID,
  getProfileIsAuthenticated,
  getProfileDoc,
} from './selectors';
import { fetchProfileDocByDID } from './asyncThunks';

export function ProfilePage() {
  const dispatch = useDispatch();
  const did = useSelector(getProfileDID);
  const profileDoc = useSelector(getProfileDoc) || {};
  const isAuthenticated = useSelector(getProfileIsAuthenticated);
  const history = useHistory();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [didProfileDataChange, setDidProfileDataChange] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/login');
    } else if (typeof did === 'string') {
      dispatch(fetchProfileDocByDID(did));
    }
  }, [history, isAuthenticated, did, dispatch]);

  React.useEffect(() => {
    setName(profileDoc.name);
    setDescription(profileDoc.description);
  }, [profileDoc]);

  React.useEffect(() => {
    const profileChanged =
      name !== profileDoc.name || description !== profileDoc.description;
    setDidProfileDataChange(profileChanged);
  }, [name, description, setDidProfileDataChange, profileDoc]);

  const handleChangeText = (key: string, changedText: string) => {
    if (key === 'name') {
      setName(changedText);
    }
    if (key === 'description') {
      setDescription(changedText);
    }
  };

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
          />
          <InputWithLabel
            label="Description"
            value={description}
            onChange={(event) =>
              handleChangeText('description', event.target.value)
            }
          />
          <Button className="mt-3" disabled={!didProfileDataChange}>
            Save Changes
          </Button>
        </div>
      )}
    </PageLayout>
  );
}

export default ProfilePage;
