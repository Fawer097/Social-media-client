import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from '../pages/MainPage/ProfilePage/ProfilePage';
import SettingsPage from '../pages/MainPage/SettingsPage/SettingsPage';
import FeedPage from '../pages/MainPage/FeedPage/FeedPage';

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="feed" element={<FeedPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate replace to="/feed" />} />
    </Routes>
  );
};

export default PrivateRouter;
