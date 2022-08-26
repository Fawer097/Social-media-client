import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import modalsReducer from './slices/modalsSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    modals: modalsReducer,
  },
});
