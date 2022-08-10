import React from 'react';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';

const Profile = () => {
  const state = useSelector((state) => state.userData);
  return (
    <div className="w-full h-full relative">
      <div className={styles.header}></div>
      <div className="flex absolute top-24 left-10">
        <div className="w-32 h-32 rounded-full bg-cover bg-center bg-[url('https://emalis.org/wp-content/uploads/Anon1.jpg')]"></div>
        <div className="ml-5 mt-4 tracking-wide">
          <p className="text-2xl text-gray-800">{`${state.firstName.stringValue} ${state.lastName.stringValue}`}</p>
          <p className="text-sm ml-1 text-gray-100">{`${state.email.stringValue}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
