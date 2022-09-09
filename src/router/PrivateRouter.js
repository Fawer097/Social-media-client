import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyProfilePage from '../pages/MainPage/ProfilePage/MyProfilePage';
import OtherUserPage from '../pages/MainPage/OtherUserPage/OtherUserPage';
import SettingsPage from '../pages/MainPage/SettingsPage/SettingsPage';
import FeedPage from '../pages/MainPage/FeedPage/FeedPage';
import FriendsPage from '../pages/MainPage/FriendsPage/FriendsPage';
import GalleryPage from '../pages/MainPage/GalleryPage/GalleryPage';
import MessagerPage from '../pages/MainPage/MessagerPage/MessagerPage';
import { useSelector } from 'react-redux';

const PrivateRouter = () => {
  const { userData } = useSelector((state) => state);
  const { otherUser } = useSelector((state) => state);

  return (
    <Routes>
      <Route path="feed" element={<FeedPage />} />
      <Route path={`profile${userData.uid}`} element={<MyProfilePage />} />
      {otherUser && (
        <Route
          path={`profile${otherUser.uid}`}
          element={<OtherUserPage userData={otherUser} />}
        />
      )}
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="messager" element={<MessagerPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="/" element={<Navigate replace to="/feed" />} />
      <Route path="*" element={<Navigate replace to="/feed" />} />
    </Routes>
  );
};

export default PrivateRouter;
