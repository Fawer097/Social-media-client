import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
