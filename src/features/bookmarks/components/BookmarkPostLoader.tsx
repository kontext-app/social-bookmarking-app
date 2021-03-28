import React from 'react';
import ContentLoader from 'react-content-loader';

import { PostWrapper } from 'app/components/PostWrapper';

export function BookmarkPostLoader(): JSX.Element {
  return (
    <PostWrapper>
      <ContentLoader
        speed={2}
        width={350}
        height={124}
        viewBox="0 0 350 124"
        backgroundColor="#ffffff"
        foregroundColor="#d2d2d2"
      >
        <rect x="256" y="20" rx="3" ry="3" width="57" height="16" />
        <rect x="50" y="20" rx="3" ry="3" width="198" height="16" />
        <rect x="51" y="49" rx="3" ry="3" width="265" height="30" />
        <rect x="52" y="92" rx="3" ry="3" width="265" height="16" />
        <rect x="13" y="34" rx="0" ry="0" width="21" height="59" />
      </ContentLoader>
    </PostWrapper>
  );
}

export default BookmarkPostLoader;
