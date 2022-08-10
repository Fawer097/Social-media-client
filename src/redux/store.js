import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userDataSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
  },
});
