import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import FeedPage from './pages/MainPage/FeedPage/FeedPage';
import ProfilePage from './pages/MainPage/ProfilePage/ProfilePage';
import { useEffect } from 'react';
import AuthService from './services/AuthService';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/slices/userSlice';
import { useState } from 'react';
import LoadingPage from './pages/LoadingPage/LoadingPage';

const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      AuthService.checkAuth()
        .then((response) => {
          dispatch(setUserData(response.data));
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
        <Routes>
          <Route
            path="/"
            element={!token ? <StartPage /> : <Navigate to="feed" />}
          />
          <Route
            path="signIn"
            element={!token ? <SignInPage /> : <Navigate to="feed" />}
          />
          <Route
            path="signUp"
            element={!token ? <SignUpPage /> : <Navigate to="feed" />}
          />
          <Route
            path="feed"
            element={token ? <FeedPage /> : <Navigate to="/" />}
          />
          <Route
            path="profile"
            element={token ? <ProfilePage /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={
              token ? (
                <Navigate replace to="/feed" />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
