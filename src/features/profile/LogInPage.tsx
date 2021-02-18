import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';

import { logInWithEthereum } from './asyncThunks';
import {
  selectProfileLoadingStatus,
  selectProfileIsAuthenticated,
} from './selectors';

export function LogInPage(): JSX.Element {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectProfileLoadingStatus);
  const isAuthenticated = useSelector(selectProfileIsAuthenticated);
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
    <PageLayout title="Log in">
      <Button onClick={handleClickLogIn} loading={loadingStatus === 'pending'}>
        Log in with Web3
      </Button>
    </PageLayout>
  );
}
