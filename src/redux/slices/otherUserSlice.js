import { createSlice } from '@reduxjs/toolkit';

export const OtherUserSlice = createSlice({
  name: 'otherUserData',
  initialState: null,
  reducers: {
    setOtherUserData: (state, action) => {
      return action.payload;
    },
    setFriendCandidate: (state, action) => {
      return { ...state, friendsCandidates: action.payload };
    },
  },
});

export const { setOtherUserData } = OtherUserSlice.actions;
export const { setFriendCandidate } = OtherUserSlice.actions;
export default OtherUserSlice.reducer;
