import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import authService from './services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/slices/userSlice';
import { useState } from 'react';
import MainHeader from './components/Headers/MainHeader/MainHeader';
import Menu from './components/Menu/Menu';
import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';
import Modals from './components/Modals/Modals';
import Counters from './components/Counters/Counters';
import Loader from './components/Loader/Loader';

const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      authService
        .checkAuth()
        .then((data) => {
          dispatch(setUserData(data.data));
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-20">
        <Loader size={96} />
      </div>
    );
  }

  if (user) {
    return (
      <div className="w-screen min-h-[85vh] font-sans-serif">
        <BrowserRouter>
          <MainHeader />
          <Modals />
          <Counters />
          <div className="flex m-auto max-w-[1520px] min-h-[600px] mt-24">
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
        <Modals />
        <PublicRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
