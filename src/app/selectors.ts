import { State } from 'app/store';

export function getAppBootstrapStatus(state: State) {
  return state.app.bootstrapStatus;
}
