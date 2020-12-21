import { State } from 'app/store';

import type {
  LoadingStatusType,
  AuthenticationMethodType,
} from 'app/constants/enums';
import type { BasicProfileDocContent } from 'features/profile/types';

export function selectProfileLoadingStatus(state: State): LoadingStatusType {
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
): AuthenticationMethodType | null {
  return state.profile.authenticationMethod;
}

export function selectProfileDoc(state: State): BasicProfileDocContent {
  return state.profile.doc;
}
