import { useSelector } from 'react-redux';

import { selectListsOfIndexKey } from 'features/lists/selectors';

import type { MainMenuItem } from 'app/components/DotMenu';
import type { State } from 'app/store';

export function useDotMenuItems(): MainMenuItem[] {
  const bookmarksLists = useSelector((state: State) =>
    selectListsOfIndexKey(state, 'bookmarks')
  );

  const menuItems: MainMenuItem[] = [
    {
      label: 'Save to inbox',
      onClick: () => console.log('Save list to inbox'),
    },
  ];

  return menuItems;
}
