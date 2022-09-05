import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import ApiService from './services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/slices/userSlice';
import { useState } from 'react';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import MainHeader from './components/Headers/MainHeader/MainHeader';
import Menu from './components/Menu/Menu';
import PrivateRouter from './router/PrivateRouter';
import PublicRouter from './router/PublicRouter';
import Modals from './components/Modals/Modals';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import {
  setAllFriendsData,
  setFriends,
  setIncomingRequests,
} from './redux/slices/friendsSlice';

const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setLoading(true);
      ApiService.checkAuth()
        .then((response) => {
          dispatch(setUserData(response.data));
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, 'Friends', user.uid), (doc) => {
        dispatch(setAllFriendsData(doc.data()));
        if (doc.data()) {
          ApiService.getFriendsData().then((data) => {
            dispatch(setIncomingRequests(data.data.candidatesData));
            dispatch(setFriends(data.data.friendsData));
          });
        }
      });
    }
  }, [user]);

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return (
      <div className="w-screen h-screen font-sans-serif">
        <BrowserRouter>
          <MainHeader />
          <Modals />
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
        <Modals />
        <PublicRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
