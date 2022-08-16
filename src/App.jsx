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
import { setAuthStatus } from './redux/slices/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const loggedIn = useSelector((state) => state.authStatus);

  useEffect(() => {
    if (token) {
      AuthService.checkAuth()
        .then((response) => {
          dispatch(setAuthStatus(true));
          dispatch(setUserData(response.data));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="w-screen h-screen font-sans-serif">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !loggedIn || !token ? <StartPage /> : <Navigate to="feed" />
            }
          />
          <Route
            path="signIn"
            element={
              !loggedIn || !token ? <SignInPage /> : <Navigate to="feed" />
            }
          />
          <Route
            path="signUp"
            element={
              !loggedIn || !token ? <SignUpPage /> : <Navigate to="feed" />
            }
          />
          <Route
            path="feed"
            element={loggedIn || token ? <FeedPage /> : <Navigate to="/" />}
          />
          <Route
            path="profile"
            element={loggedIn || token ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
