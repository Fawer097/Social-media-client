import { createSlice } from '@reduxjs/toolkit';

export const otherUserSlice = createSlice({
  name: 'otherUserData',
  initialState: null,
  reducers: {
    setOtherUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOtherUserData } = otherUserSlice.actions;
export default otherUserSlice.reducer;
