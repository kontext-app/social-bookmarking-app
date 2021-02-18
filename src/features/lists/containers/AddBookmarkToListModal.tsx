import ReactModal from 'react-modal';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';

import { addBookmarkToList } from '../asyncThunks';
import { selectListsLoadingStatus } from '../selectors';
import { fetchBookmarksByDocIDs } from 'features/bookmarks/asyncThunks';
import { isDocIDBookmark } from 'app/apis/ceramic';
import { prefixCeramicDocID } from 'app/utils/doc';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  listDocID: string;
};

export function AddBookmarkToListModal(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectListsLoadingStatus);
  const [docIDInput, setDocIDInput] = useState('');

  const handleAddBookmarkToList = async () => {
    try {
      const docIdURL = prefixCeramicDocID(docIDInput);

      if (!(await isDocIDBookmark(docIdURL))) {
        throw new Error('Entered DocID is not a bookmark');
      }

      await dispatch(
        addBookmarkToList({
          bookmarkDocID: docIdURL,
          listDocID: prefixCeramicDocID(props.listDocID),
        })
      );
      dispatch(fetchBookmarksByDocIDs({ docIDs: [docIdURL] }));
      toast.success('Successfully added bookmark to list 🥳');
      setDocIDInput('');
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <ReactModal
      style={{
        content: {
          top: '10rem',
          left: '10rem',
          right: '10rem',
          bottom: '10rem',
        },
      }}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <div className="container m-auto flex flex-col">
        <div className="text-lg text-center">Add bookmark to list</div>
        <Input
          placeholder="Enter a bookmark doc id"
          value={docIDInput}
          onChange={(event) => setDocIDInput(event.target.value)}
        />
        <Button
          onClick={handleAddBookmarkToList}
          loading={loadingStatus === 'pending'}
        >
          Add bookmark
        </Button>
      </div>
    </ReactModal>
  );
}
