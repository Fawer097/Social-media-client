import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import AuthService from './services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/slices/userSlice';
import { useState } from 'react';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import MainHeader from './components/MainHeader/MainHeader';
import Menu from './components/Menu/Menu';
import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';

const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
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

  if (user) {
    return (
      <div className="w-screen h-screen font-sans-serif">
        <BrowserRouter>
          <MainHeader />
          <div className="flex m-auto max-w-[1520px] min-h-[940px] mt-24">
            <Menu />
            <PrivateRouter />
          </div>
        </BrowserRouter>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen font-sans-serif">
      <BrowserRouter>
        <PublicRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
