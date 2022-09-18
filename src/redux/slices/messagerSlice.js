import { createSlice } from '@reduxjs/toolkit';

export const messagerSlice = createSlice({
  name: 'messager',
  initialState: {
    activeChat: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      return { ...state, activeChat: action.payload };
    },
    resetChatsData: (state, action) => {
      return {
        activeChat: null,
      };
    },
  },
});

export const { setActiveChat } = messagerSlice.actions;
export const { resetChatsData } = messagerSlice.actions;
export default messagerSlice.reducer;
