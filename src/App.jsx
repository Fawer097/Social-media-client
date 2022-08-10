import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import FeedPage from './pages/MainPage/FeedPage/FeedPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import axios from 'axios';
import { url } from './config/config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from './redux/slices/userDataSlice';
import ProfilePage from './pages/MainPage/ProfilePage/ProfilePage';

const App = () => {
  const [logIn, setLogIn] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .post(url + '/api/firestore', { uid: user.uid })
          .then((response) => {
            setLogIn(true);
            dispatch(getUserData(response.data._fieldsProto));
          })
          .catch((error) => console.error(error));
      } else setLogIn(false);
    });
  }, []);

  return (
    <div className="w-screen h-screen font-sans-serif">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={logIn ? <Navigate replace to="/feed" /> : <StartPage />}
          />
          <Route
            path="signIn"
            element={logIn ? <Navigate replace to="/" /> : <SignInPage />}
          />
          <Route
            path="signUp"
            element={logIn ? <Navigate replace to="/" /> : <SignUpPage />}
          />
          <Route
            path="feed"
            element={logIn ? <FeedPage /> : <Navigate replace to="/" />}
          />
          <Route
            path="profile"
            element={logIn ? <ProfilePage /> : <Navigate replace to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
