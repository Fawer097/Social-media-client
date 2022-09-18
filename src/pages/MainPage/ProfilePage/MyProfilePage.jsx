import React from 'react';
import MyProfile from '../../../components/Profile/MyProfile/MyProfile';
import styles from './MyProfilePage.module.scss';

const MyProfilePage = () => {
  return (
    <div className={styles.wrapper}>
      <MyProfile />
    </div>
  );
};

export default MyProfilePage;
