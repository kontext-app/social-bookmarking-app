import { State } from 'app/store';

import type {
  LoadingStatus,
  AuthenticationMethod,
  BasicProfileDocContent,
} from 'kontext-common';

export function selectProfileLoadingStatus(state: State): LoadingStatus {
  return state.profile.loadingStatus;
}

export function selectProfileDID(state: State): null | string {
  return state.profile.did;
}

export function selectProfileError(state: State): null | Error {
  return state.profile.error;
}

export function selectProfileIsAuthenticated(state: State): boolean {
  return state.profile.isAuthenticated;
}

export function selectProfileAuthenticationMethod(
  state: State
): AuthenticationMethod | null {
  return state.profile.authenticationMethod;
}

export function selectProfileDoc(state: State): BasicProfileDocContent {
  return state.profile.doc;
}
