import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: false,
  reducers: {
    setUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
