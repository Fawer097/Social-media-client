import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserInfo.module.scss';
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeAltIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';
import UserService from '../../../services/UserService';
import ProfileGallery from '../ProfileGallery/ProfileGallery';

const UserInfo = (props) => {
  const state = useSelector((state) => state.userData);

  return (
    <div className={styles.userInfoWrapper}>
      <div className="text-lg text-gray-700 flex justify-between items-center">
        <h4>About me</h4>
      </div>
      <div className="font-light text-sm text-gray-700 mt-4 mb-4">
        <p>{props.userData.about}</p>
      </div>
      <div className={styles.infoListWrapper}>
        <div className={styles.listItemWrapper}>
          <div className={styles.iconWrapper}>
            <CalendarIcon />
          </div>
          <div className={styles.textListWrapper}>
            Born on {UserService.dateConversion(props.userData.dateOfBirth)}
          </div>
        </div>
        {props.userData.city || props.userData.country ? (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <LocationMarkerIcon />
            </div>
            <div className={styles.textListWrapper}>
              {props.userData.city}
              {props.userData.city && props.userData.country && ', '}
              {props.userData.country}
            </div>
          </div>
        ) : null}
        {props.userData.site && (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <GlobeAltIcon />
            </div>
            <div className={styles.textListWrapper}>
              <a href="state.site" target="_blank">
                {props.userData.site}
              </a>
            </div>
          </div>
        )}
        {props.userData.company || props.userData.post ? (
          <div className={styles.listItemWrapper}>
            <div className={styles.iconWrapper}>
              <BriefcaseIcon />
            </div>
            <div className={styles.textListWrapper}>
              {props.userData.post}
              {props.userData.company && props.userData.post && ' at '}
              {props.userData.company}
            </div>
          </div>
        ) : null}
      </div>
      <ProfileGallery />
    </div>
  );
};

export default UserInfo;
