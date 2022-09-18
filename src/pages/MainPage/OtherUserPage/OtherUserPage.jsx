import React from 'react';
import OtherUserProfile from '../../../components/Profile/OtherUserProfile/OtherUserProfile';
import styles from './OtherUserPage.module.scss';

const ProfilePage = (props) => {
  return (
    <div className={styles.wrapper}>
      <OtherUserProfile userData={props.userData} />
    </div>
  );
};

export default ProfilePage;
