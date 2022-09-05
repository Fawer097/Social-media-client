import { createSlice } from '@reduxjs/toolkit';

export const friendsSlice = createSlice({
  name: 'friendsData',
  initialState: {
    friends: [],
    incomingRequests: [],
    outgoingRequests: [],
  },
  reducers: {
    setAllFriendsData: (state, action) => {
      return action.payload;
    },
    setFriends: (state, action) => {
      return { ...state, friends: action.payload };
    },
    setIncomingRequests: (state, action) => {
      return { ...state, incomingRequests: action.payload };
    },
    setOutgoingRequests: (state, action) => {
      return { ...state, outgoingRequests: action.payload };
    },
  },
});

export const { setAllFriendsData } = friendsSlice.actions;
export const { setFriends } = friendsSlice.actions;
export const { setIncomingRequests } = friendsSlice.actions;
export const { setOutgoingRequests } = friendsSlice.actions;
export default friendsSlice.reducer;
