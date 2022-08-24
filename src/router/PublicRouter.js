import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import StartPage from '../pages/StartPage/StartPage';

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="signIn" element={<SignInPage />} />
      <Route path="signUp" element={<SignUpPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default PublicRouter;
