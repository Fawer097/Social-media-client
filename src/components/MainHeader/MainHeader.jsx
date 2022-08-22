import React from 'react';
import styles from './MainHeader.module.scss';
import logo from '../../images/logo_black.png';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BellIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import AuthService from '../../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';

const MainHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userData);

  const logout = () => {
    AuthService.logout(state.email)
      .then((response) => {
        localStorage.removeItem('token');
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.wrapper}>
      <div className="flex items-center justify-center w-full max-w-[1520px] h-full">
        <div className={styles.logoWrapper}>
          <Link to="/">
            <img src={logo} alt="logo" className="w-60 cursor-pointer"></img>
          </Link>
        </div>
        <div className={styles.searchWrapper}>
          <input type="search" className={styles.search}></input>
        </div>
        <div className={styles.userPanel}>
          <div className={styles.userIconWrapper}>
            <UserIcon />
          </div>
          <div className="w-7 h-7 text-gray-500">
            <BellIcon />
          </div>
          <div className="w-7 h-7 text-gray-500">
            <CogIcon />
          </div>
          <div className={styles.logoIconWrapper}>
            <LogoutIcon onClick={logout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
