import { createSlice } from '@reduxjs/toolkit';

export const countersSlice = createSlice({
  name: 'counters',
  initialState: {
    friends: 0,
    posts: 0,
    images: 0,
    incomingRequests: 0,
  },
  reducers: {
    setFriendsCounter: (state, action) => {
      return { ...state, friends: action.payload };
    },
    setPostsCounter: (state, action) => {
      return { ...state, posts: action.payload };
    },
    setImagesCounter: (state, action) => {
      return { ...state, images: action.payload };
    },
    setIncomingRequestsCounter: (state, action) => {
      return { ...state, incomingRequests: action.payload };
    },
    resetCounters: (state, action) => {
      return {
        activeChat: {
          friends: 0,
          posts: 0,
          photos: 0,
          incomingRequests: 0,
        },
      };
    },
  },
});

export const { setFriendsCounter } = countersSlice.actions;
export const { setPostsCounter } = countersSlice.actions;
export const { setImagesCounter } = countersSlice.actions;
export const { setIncomingRequestsCounter } = countersSlice.actions;
export const { resetCounters } = countersSlice.actions;
export default countersSlice.reducer;
