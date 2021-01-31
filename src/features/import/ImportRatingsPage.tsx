import React, { useState } from 'react';
import { CSVReader } from 'react-papaparse';
import { camelCase } from 'lodash';

import { PageLayout } from 'app/components/PageLayout';
import { ImportFromIMDB } from 'features/import/components/ImportFromIMDB';
import { Button } from 'app/components/Button';

import { RatingsImportSource } from 'app/constants';

export function ImportRatingsPage(): JSX.Element {
  const [importSource, setImportSource] = useState(RatingsImportSource.IMDB);

  return (
    <PageLayout>
      <div className="text-xl">Import Ratings</div>
      <div className="text-base">
        Import your likes, ratings and reviews into kontext.
      </div>
      <div>
        <span>Import from: </span>
        <select onChange={(event) => setImportSource(event.target.value)}>
          {Object.values(RatingsImportSource).map((importSourceType) => (
            <option key={importSourceType} value={importSourceType}>
              {importSourceType}
            </option>
          ))}
        </select>
      </div>
      {importSource === RatingsImportSource.IMDB ? <ImportFromIMDB /> : null}
    </PageLayout>
  );
}
