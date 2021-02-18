import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { enums } from 'kontext-common';
import { useHistory } from 'react-router-dom';

import { PageLayout } from 'app/components/PageLayout';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';

import { selectListsLoadingStatus } from 'features/lists/selectors';
import { addList } from 'features/lists/asyncThunks';

import type { AppDispatch } from 'app/store';

type FormInputs = {
  name: string;
  description: string;
};

export function AddListPage(): JSX.Element {
  const { register, handleSubmit, errors } = useForm<FormInputs>();
  const dispatch: AppDispatch = useDispatch();
  const listsLoadingStatus = useSelector(selectListsLoadingStatus);
  const history = useHistory();

  const submit = (formData: FormInputs) => {
    dispatch(
      addList({
        listToAdd: {
          title: formData.name,
          description: formData.description,
        },
        listsIndexKey: 'unsorted',
      })
    ).then(() => history.push('/lists/unsorted'));
  };

  return (
    <PageLayout title="Create a List">
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Name"
          name="name"
          defaultValue="My List"
          ref={register({ required: true })}
        />
        {errors.name && <div>This field is required</div>}
        <Input
          label="Description"
          name="description"
          placeholder="Give this list a description."
          ref={register({ required: true })}
        />
        {errors.description && <div>This field is required</div>}
        <Button
          type="submit"
          disabled={Boolean(errors?.name || errors?.description)}
          loading={listsLoadingStatus === enums.LoadingStatus.PENDING}
        >
          Create list
        </Button>
      </form>
    </PageLayout>
  );
}
