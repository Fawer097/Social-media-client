import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    successModal: {
      active: false,
    },
    errorModal: { active: false },
  },
  reducers: {
    setSuccessModal: (state, action) => {
      return { ...state, successModal: action.payload };
    },
    setErrorModal: (state, action) => {
      return { ...state, errorModal: action.payload };
    },
  },
});

export const { setSuccessModal } = modalsSlice.actions;
export const { setErrorModal } = modalsSlice.actions;
export default modalsSlice.reducer;
