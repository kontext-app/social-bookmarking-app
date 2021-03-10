async function fetchFromRecommender<T>(
  route: string,
  init?: RequestInit
): Promise<T> {
  const url = `${process.env.REACT_APP_RECOMMENDER_HOST}/api/v1/${route}`;
  const response = await fetch(url, init);
  return response.json();
}

export async function getCuratedBookmarksDocID(): Promise<string> {
  return fetchFromRecommender('bookmarks/curated-bookmarks-doc-id');
}

export async function getAggregatedBookmarkRatingsDocID(): Promise<string> {
  return fetchFromRecommender('ratings/aggregated-bookmark-ratings-doc-id');
}

export async function subscribeDID(did: string): Promise<void> {
  return fetchFromRecommender('users/subscribe', {
    method: 'PUT',
    body: JSON.stringify({ did }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}

export async function unsubscribeDID(did: string): Promise<void> {
  return fetchFromRecommender('users/unsubscribe', {
    method: 'PUT',
    body: JSON.stringify({ did }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  });
}
