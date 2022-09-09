import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserInfo.module.scss';
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeAltIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import UserService from '../../../../services/UserService';
import ProfileGallery from '../ProfileGallery/ProfileGallery';

const UserInfo = () => {
  const { userData } = useSelector((state) => state);

  return (
    <div className={styles.userInfoWrapper}>
      <div className="text-lg text-gray-700 flex justify-between items-center">
        <h4>About me</h4>
      </div>
      <div className="font-light text-sm text-gray-700 mt-4 mb-4">
        <p>{userData.about}</p>
      </div>
      <div className={styles.infoListWrapper}>
        <div className={styles.listItemWrapper}>
          <div className={styles.iconWrapper}>
            <CalendarIcon />
          </div>
          <div className={styles.textListWrapper}>
            Born on {UserService.dateConversion(userData.dateOfBirth)}
          </div>
        </div>
        {userData.city || userData.country ? (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <MapPinIcon />
            </div>
            <div className={styles.textListWrapper}>
              {userData.city}
              {userData.city && userData.country && ', '}
              {userData.country}
            </div>
          </div>
        ) : null}
        {userData.site && (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <GlobeAltIcon />
            </div>
            <div className={styles.textListWrapper}>
              <a href="state.site" target="_blank">
                {userData.site}
              </a>
            </div>
          </div>
        )}
        {userData.company || userData.post ? (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <BriefcaseIcon />
            </div>
            <div className={styles.textListWrapper}>
              {userData.post}
              {userData.company && userData.post && ' at '}
              {userData.company}
            </div>
          </div>
        ) : null}
      </div>
      <ProfileGallery />
    </div>
  );
};

export default UserInfo;
