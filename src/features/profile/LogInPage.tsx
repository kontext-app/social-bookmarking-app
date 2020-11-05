import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';

import { logInWithEthereum } from './asyncThunks';
import {
  getProfileLoadingStatus,
  getProfileIsAuthenticated,
} from './selectors';

export function LogInPage() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(getProfileLoadingStatus);
  const isAuthenticated = useSelector(getProfileIsAuthenticated);
  const history = useHistory();

  const handleClickLogIn = () => {
    dispatch(logInWithEthereum());
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace('/profile');
    }
  }, [history, isAuthenticated]);

  return (
    <PageLayout>
      <Button onClick={handleClickLogIn} loading={loadingStatus === 'pending'}>
        Log in with Web3
      </Button>
    </PageLayout>
  );
}
