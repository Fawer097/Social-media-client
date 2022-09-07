import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import otherUserReducer from './slices/otherUserSlice';
import modalsReducer from './slices/modalsSlice';
import friendsReducer from './slices/friendsSlice';
import messagerReducer from './slices/messagerSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    otherUserData: otherUserReducer,
    modals: modalsReducer,
    friendsData: friendsReducer,
    messagerData: messagerReducer,
  },
});
