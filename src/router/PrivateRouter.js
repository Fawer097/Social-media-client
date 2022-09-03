import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from '../pages/MainPage/ProfilePage/ProfilePage';
import SettingsPage from '../pages/MainPage/SettingsPage/SettingsPage';
import FeedPage from '../pages/MainPage/FeedPage/FeedPage';
import FriendsPage from '../pages/MainPage/FriendsPage/FriendsPage';
import GalleryPage from '../pages/MainPage/GalleryPage/GalleryPage';
import MessagerPage from '../pages/MainPage/MessagerPage/MessagerPage';
import { useSelector } from 'react-redux';

const PrivateRouter = () => {
  const userData = useSelector((state) => state.userData);
  const otherUserData = useSelector((state) => state.otherUserData);

  return (
    <Routes>
      <Route path="feed" element={<FeedPage />} />
      <Route
        path={`profile${userData.uid}`}
        element={<ProfilePage userData={userData} />}
      />
      {otherUserData && (
        <Route
          path={`profile${otherUserData.uid}`}
          element={<ProfilePage userData={otherUserData} />}
        />
      )}
      <Route path="gallery" element={<GalleryPage />} />
      <Route path="friends" element={<FriendsPage />} />
      <Route path="messager" element={<MessagerPage />} />
      <Route path="settings" element={<SettingsPage />} />
      <Route path="/" element={<Navigate replace to="/feed" />} />
      {/* <Route path="*" element={<Navigate replace to="/feed" />} /> */}
    </Routes>
  );
};

export default PrivateRouter;
