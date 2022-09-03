import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    successModal: {
      active: false,
    },
    errorModal: { active: false },
    avatarModal: { active: false },
  },
  reducers: {
    setSuccessModal: (state, action) => {
      return { ...state, successModal: action.payload };
    },
    setErrorModal: (state, action) => {
      return { ...state, errorModal: action.payload };
    },
    setAvatarModal: (state, action) => {
      return { ...state, avatarModal: action.payload };
    },
  },
});

export const { setSuccessModal } = modalsSlice.actions;
export const { setErrorModal } = modalsSlice.actions;
export const { setAvatarModal } = modalsSlice.actions;
export default modalsSlice.reducer;
