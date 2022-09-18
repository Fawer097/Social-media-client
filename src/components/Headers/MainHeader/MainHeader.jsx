import React from 'react';
import styles from './MainHeader.module.scss';
import logo from '../../../images/logo_black.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import authService from '../../../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserData } from '../../../redux/slices/userSlice';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import HeaderSearch from '../../Searches/HeaderSearch/HeaderSearch';
import { resetOtherUser } from '../../../redux/slices/otherUserSlice';
import { resetChatsData } from '../../../redux/slices/messagerSlice';

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const logout = () => {
    authService
      .logout(userData.uid)
      .then(() => {
        localStorage.removeItem('token');
        dispatch(resetUserData());
        dispatch(resetOtherUser());
        dispatch(resetChatsData());
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.wrapper}>
      <div className="flex items-center justify-center w-full max-w-[1520px] h-full">
        <div className={styles.logoWrapper}>
          <Link to="/feed">
            <img src={logo} alt="logo" className="w-full cursor-pointer"></img>
          </Link>
        </div>
        <div className={styles.searchWrapper}>
          <div className="relative w-2/3 max-w-[400px]">
            <HeaderSearch />
            <MagnifyingGlassIcon className="w-5 text-gray-400 absolute top-1.5 left-3" />
          </div>
        </div>
        <div className={styles.userPanel}>
          <div>
            <Link to={`/profile${userData.uid}`}>
              {userData && (
                <img
                  className="w-9 h-9 rounded-full cursor-pointer"
                  src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
                  alt="avatar"
                />
              )}
            </Link>
          </div>
          <div className={styles.settingsIconWrapper}>
            <Link to="/settings">
              <Cog8ToothIcon />
            </Link>
          </div>
          <div className={styles.logoIconWrapper}>
            <ArrowRightOnRectangleIcon onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
