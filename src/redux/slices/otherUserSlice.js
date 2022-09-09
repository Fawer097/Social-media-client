import { createSlice } from '@reduxjs/toolkit';

export const otherUserSlice = createSlice({
  name: 'otherUserData',
  initialState: null,
  reducers: {
    setOtherUser: (state, action) => {
      return { uid: action.payload };
    },
    resetOtherUser: (state, action) => {
      return null;
    },
  },
});

export const { setOtherUser } = otherUserSlice.actions;
export const { resetOtherUser } = otherUserSlice.actions;
export default otherUserSlice.reducer;
