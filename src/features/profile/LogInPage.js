import React from 'react';

import { PageLayout } from '../../app/PageLayout';

export function LogInPage() {
  return (
    <PageLayout>
      <h1>Log In via Web3</h1>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Log In
      </button>
    </PageLayout>
  );
}
