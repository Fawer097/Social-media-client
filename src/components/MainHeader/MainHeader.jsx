import React from 'react';
import styles from './MainHeader.module.scss';
import logo from '../../images/logo_black.png';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserIcon,
  BellIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

const MainHeader = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const logOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className="flex items-center justify-center w-full max-w-[1920px] h-full">
        <div className={styles.logoWrapper}>
          <Link to="/">
            <img src={logo} alt="logo" className="w-60 cursor-pointer"></img>
          </Link>
        </div>
        <div className={styles.searchWrapper}>
          <input type="search" className={styles.search}></input>
        </div>
        <div className={styles.userPanel}>
          <div className="w-9 h-9 rounded-full bg-gray-200 p-1.5 text-gray-500">
            <UserIcon />
          </div>
          <div className="w-7 h-7 text-gray-500">
            <BellIcon />
          </div>
          <div className="w-7 h-7 text-gray-500">
            <CogIcon />
          </div>
          <div className="w-7 h-7 text-gray-500 cursor-pointer hover:scale-110 duration-500">
            <LogoutIcon onClick={logOut} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
