import React from 'react';
import logo from '../../images/logo_black.png';
import styles from './StartPageHeader.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const StartPageHeader = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <Link to="/">
          <img src={logo} alt="logo" className="hover:scale-105 duration-500" />
        </Link>
      </div>
      <div className={styles.buttonsWrapper}>
        <button
          className={styles.signInBtn}
          onClick={() => navigate('/signIn')}
        >
          Sign in
        </button>
        <button
          className={styles.signUpBtn}
          onClick={() => navigate('/signUp')}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default StartPageHeader;
