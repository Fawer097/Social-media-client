import { createSlice } from '@reduxjs/toolkit';

export const otherUserSlice = createSlice({
  name: 'otherUserData',
  initialState: null,
  reducers: {
    setOtherUserData: (state, action) => {
      return action.payload;
    },
    resetOtherUserData: (state, action) => {
      return null;
    },
  },
});

export const { setOtherUserData } = otherUserSlice.actions;
export const { resetOtherUserData } = otherUserSlice.actions;
export default otherUserSlice.reducer;
