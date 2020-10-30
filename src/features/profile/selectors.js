import { createSelector } from '@reduxjs/toolkit';

export function getProfileLoadingStatus(state) {
  return state.profile.loadingStatus;
}

export function getProfileDID(state) {
  return state.profile.did;
}

export function getProfileError(state) {
  return state.profile.error;
}

export function getProfileIsAuthenticated(state) {
  return state.profile.isAuthenticated;
}
