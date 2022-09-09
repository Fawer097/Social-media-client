import { createSlice } from '@reduxjs/toolkit';

export const messagerSlice = createSlice({
  name: 'friendsData',
  initialState: {
    activeChat: null,
    lastMessage: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      return { ...state, activeChat: action.payload };
    },
    setLastMessage: (state, action) => {
      return { ...state, lastMessage: action.payload };
    },
    resetChatsData: (state, action) => {
      return {
        activeChat: null,
        lastMessage: null,
      };
    },
  },
});

export const { setActiveChat } = messagerSlice.actions;
export const { setLastMessage } = messagerSlice.actions;
export const { resetChatsData } = messagerSlice.actions;
export default messagerSlice.reducer;
