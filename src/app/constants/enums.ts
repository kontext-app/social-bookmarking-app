export type LoadingStatusType = 'idle' | 'pending' | 'rejected' | 'fulfilled';

export const LoadingStatus: {
  IDLE: 'idle';
  PENDING: 'pending';
  FULFILLED: 'fulfilled';
  REJECTED: 'rejected';
} = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

export type DefaultBookmarksIndexKeyType =
  | 'unsorted'
  | 'public'
  | 'private'
  | 'lists';

export const DefaultBookmarksIndexKeys = {
  UNSORTED: 'unsorted',
  PUBLIC: 'public',
  PRIVATE: 'private',
  LISTS: 'lists',
};
