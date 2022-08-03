import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    getUserData: (state, action) => {
      return action.payload;
    },
  },
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
