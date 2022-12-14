import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: null,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
    setUserEmail: (state, action) => {
      return { ...state, email: action.payload };
    },
    resetUserData: (state, action) => {
      return null;
    },
  },
});

export const { setUserData } = userSlice.actions;
export const { setUserEmail } = userSlice.actions;
export const { resetUserData } = userSlice.actions;
export default userSlice.reducer;
