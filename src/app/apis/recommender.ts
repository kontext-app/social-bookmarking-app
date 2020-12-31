import type { BookmarkFromRecommender } from 'features/bookmarks/types';

async function fetchFromRecommender<T>(
  route: string,
  init?: RequestInit
): Promise<T> {
  const url = `${process.env.REACT_APP_RECOMMENDER_HOST}/api/v1/${route}`;
  const response = await fetch(url, init);
  return response.json();
}

export async function getRecentPublicBookmarks(): Promise<
  BookmarkFromRecommender[]
> {
  return fetchFromRecommender('bookmarks/recent');
}

export async function subscribeDID(did: string): Promise<void> {
  return fetchFromRecommender('users/subscribe', {
    method: 'PUT',
    body: JSON.stringify({ did }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}
