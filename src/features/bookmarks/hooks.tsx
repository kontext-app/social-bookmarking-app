import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { selectListsOfIndexKey } from 'features/lists/selectors';
import { addBookmarkToList } from 'features/lists/asyncThunks';
import { addBookmarkToIndexKey } from 'features/bookmarks/asyncThunks';

import type { MainMenuItem } from 'app/components/DotMenu';
import type { State } from 'app/store';

export function useDotMenuItems(bookmarkDocID: string): MainMenuItem[] {
  const dispatch = useDispatch();
  const lists = useSelector((state: State) =>
    selectListsOfIndexKey(state, 'unsorted')
  );

  const menuItems: MainMenuItem[] = [
    {
      label: 'Save to inbox',
      onClick: async () => {
        try {
          await dispatch(
            addBookmarkToIndexKey({ bookmarkDocID, indexKey: 'unsorted' })
          );
          toast.success('Successfully saved bookmark to inbox');
        } catch (error) {
          console.log(error);
          toast.error('Whoops something went wrong');
        }
      },
    },
    {
      label: 'Add to list ▶️',
      subMenuItems: lists.map((list) => ({
        label: list.title,
        onClick: async () => {
          try {
            await dispatch(
              addBookmarkToList({
                bookmarkDocID,
                listDocID: list.docID,
              })
            );
            toast.success('Successfully added bookmark to list');
          } catch (error) {
            console.log(error);
            toast.error('Whoops something went wrong');
          }
        },
      })),
    },
  ];

  return menuItems;
}
