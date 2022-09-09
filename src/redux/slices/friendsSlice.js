import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
  name: 'friendsData',
  initialState: {
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
  },
  reducers: {
    setFriendsData: (state, action) => {
      return action.payload;
    },
    resetFriendsData: (state, action) => {
      return {
        friends: [],
        incomingRequests: [],
        outgoingRequests: [],
      };
    },
  },
});

export const { setFriendsData } = friendsSlice.actions;
export const { resetFriendsData } = friendsSlice.actions;
export default friendsSlice.reducer;
