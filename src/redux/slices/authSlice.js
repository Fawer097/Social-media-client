import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authStatus',
  initialState: false,
  reducers: {
    setAuthStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
