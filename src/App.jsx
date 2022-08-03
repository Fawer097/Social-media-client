import React from 'react';
import StartPage from './pages/StartPage/StartPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Feed from './pages/MainPage/Feed/Feed';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import axios from 'axios';
import { url } from './config/config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from './redux/slices/userSlice';

const App = () => {
  const [login, setLogin] = useState();
  const auth = getAuth();
  const dispatch = useDispatch();

  // после авторизации получаю данные авторизованного пользователя

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .post(url + '/api/firestore', { uid: user.uid })
          .then((response) => {
            setLogin('yes');
            dispatch(getUserData(response.data._fieldsProto));
          })
          .catch((error) => console.error(error));
      } else setLogin('no');
    });
  }, []);

  return (
    <div className="w-screen h-screen font-sans-serif">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              (login === 'yes' && <Navigate replace to="/feed" />) ||
              (login === 'no' && <StartPage />)
            }
          />
          <Route
            path="signIn"
            element={
              (login === 'yes' && <Navigate replace to="/" />) ||
              (login === 'no' && <SignInPage />)
            }
          />
          <Route
            path="signUp"
            element={
              (login === 'yes' && <Navigate replace to="/" />) ||
              (login === 'no' && <SignUpPage />)
            }
          />
          <Route
            path="feed"
            element={
              (login === 'yes' && <Feed />) ||
              (login === 'no' && <Navigate replace to="/" />)
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
