import { Action, AnyAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { enums } from 'kontext-common';

interface RejectedAction extends Action {
  error: Error;
}

export function isRejectedAction(
  action: AnyAction,
  entityName: string
): action is RejectedAction {
  return action.type.startsWith(entityName) && action.type.endsWith('rejected');
}

export function isPendingAction(
  action: AnyAction,
  entityName: string
): action is AnyAction {
  return action.type.startsWith(entityName) && action.type.endsWith('pending');
}

export function isFulfilledAction(
  action: AnyAction,
  entityName: string
): action is AnyAction {
  return (
    action.type.startsWith(entityName) && action.type.endsWith('fulfilled')
  );
}

export function addAsyncMatchers(
  builder: ActionReducerMapBuilder<any>,
  entityName: string
): void {
  builder.addMatcher(
    (action): action is AnyAction => isPendingAction(action, entityName),
    (state) => {
      state.loadingStatus = enums.LoadingStatus.PENDING;
    }
  );
  builder.addMatcher(
    (action): action is AnyAction => isFulfilledAction(action, entityName),
    (state) => {
      state.loadingStatus = enums.LoadingStatus.FULFILLED;
    }
  );
  builder.addMatcher(
    (action): action is RejectedAction => isRejectedAction(action, entityName),
    (state, action) => {
      const { error } = action;
      state.loadingStatus = enums.LoadingStatus.REJECTED;
      state.error = error;
    }
  );
}
