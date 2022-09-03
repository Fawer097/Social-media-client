import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import otherUserReducer from './slices/otherUserSlice';
import modalsReducer from './slices/modalsSlice';
import { usersApi } from './api/usersApi';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    otherUserData: otherUserReducer,
    modals: modalsReducer,
    // [usersApi.reducerPath]: usersApi.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(usersApi.middleware),
});
