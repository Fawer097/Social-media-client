import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import otherUserReducer from './slices/otherUserSlice';
import modalsReducer from './slices/modalsSlice';
import messagerReducer from './slices/messagerSlice';
import countersReducer from './slices/countersSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    otherUser: otherUserReducer,
    modals: modalsReducer,
    messagerData: messagerReducer,
    counters: countersReducer,
  },
});
