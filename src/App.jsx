import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import FeedPage from './pages/MainPage/FeedPage/FeedPage';
import ProfilePage from './pages/MainPage/ProfilePage/ProfilePage';
import { useEffect } from 'react';
import AuthService from './services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/slices/userSlice';
import { useState } from 'react';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import { setAuthStatus } from './redux/slices/authSlice';
import SettingsPage from './pages/MainPage/SettingsPage/SettingsPage';
import MainHeader from './components/MainHeader/MainHeader';
import Menu from './components/Menu/Menu';
import styles from './App.module.scss';

const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      AuthService.checkAuth()
        .then((response) => {
          dispatch(setUserData(response.data));
          dispatch(setAuthStatus(true));
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-screen h-screen font-sans-serif">
      <BrowserRouter>
        {auth && <MainHeader />}
        <div className={auth ? styles.mainWrapper : styles.startWrapper}>
          {auth && <Menu />}
          <Routes>
            <Route
              path="/"
              element={!auth || !token ? <StartPage /> : <Navigate to="feed" />}
            />
            <Route
              path="signIn"
              element={
                !auth || !token ? <SignInPage /> : <Navigate to="feed" />
              }
            />
            <Route
              path="signUp"
              element={
                !auth || !token ? <SignUpPage /> : <Navigate to="feed" />
              }
            />
            <Route
              path="feed"
              element={auth || token ? <FeedPage /> : <Navigate to="/" />}
            />
            <Route
              path="profile"
              element={auth || token ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="settings"
              element={auth || token ? <SettingsPage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={
                auth || token ? (
                  <Navigate replace to="/feed" />
                ) : (
                  <Navigate replace to="/" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
