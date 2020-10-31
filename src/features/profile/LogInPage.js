import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from 'app/components/PageLayout';
import { Button } from 'app/components/Button';

import { logInWithEthereum } from './asyncThunks';
import { getProfileLoadingStatus } from './selectors';

export function LogInPage() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(getProfileLoadingStatus);

  const handleClickLogIn = () => {
    dispatch(logInWithEthereum());
  };

  return (
    <PageLayout>
      <Button onClick={handleClickLogIn} loading={loadingStatus === 'pending'}>
        Log In with Web3
      </Button>
    </PageLayout>
  );
}
