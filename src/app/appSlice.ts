import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    idx: null,
  },
  reducers: {
    setIDX: (state, action) => {
      const { payload = {} } = action;
      state.idx = payload.idx;
    },
  },
});

export const { setIDX } = appSlice.actions;

export const appReducer = appSlice.reducer;

export default {
  appSlice,
  appReducer,
  ...appSlice.actions,
};
