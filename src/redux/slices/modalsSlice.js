import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    successModal: {
      active: false,
    },
    errorModal: { active: false },
    imageModal: { active: false },
    messageModal: { active: false },
    deleteChatModal: { active: false },
  },
  reducers: {
    setSuccessModal: (state, action) => {
      return { ...state, successModal: action.payload };
    },
    setErrorModal: (state, action) => {
      return { ...state, errorModal: action.payload };
    },
    setImageModal: (state, action) => {
      return { ...state, imageModal: action.payload };
    },
    setMessageModal: (state, action) => {
      return { ...state, messageModal: action.payload };
    },
    setDeleteChatModal: (state, action) => {
      return { ...state, deleteChatModal: action.payload };
    },
  },
});

export const { setSuccessModal } = modalsSlice.actions;
export const { setErrorModal } = modalsSlice.actions;
export const { setImageModal } = modalsSlice.actions;
export const { setMessageModal } = modalsSlice.actions;
export const { setDeleteChatModal } = modalsSlice.actions;
export default modalsSlice.reducer;
