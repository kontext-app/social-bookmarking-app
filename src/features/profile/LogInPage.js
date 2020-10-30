import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PageLayout } from '../../app/PageLayout';

import { logInWithEthereum } from './asyncThunks';

export function LogInPage() {
  const dispatch = useDispatch();

  const handleClickLogIn = () => {
    dispatch(logInWithEthereum());
  };

  return (
    <PageLayout>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleClickLogIn}
      >
        Log In with Web3
      </button>
    </PageLayout>
  );
}
