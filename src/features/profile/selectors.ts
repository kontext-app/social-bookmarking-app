import { State } from 'app/store';

export function getProfileLoadingStatus(state: State) {
  return state.profile.loadingStatus;
}

export function getProfileDID(state: State) {
  return state.profile.did;
}

export function getProfileError(state: State) {
  return state.profile.error;
}

export function getProfileIsAuthenticated(state: State) {
  return state.profile.isAuthenticated;
}

export function getProfileDoc(state: State) {
  return state.profile.doc;
}
