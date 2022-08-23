import React from 'react';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../images/defaultAvatar.jpeg';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase.js';
import { useEffect } from 'react';
import { useState } from 'react';
import whiteBg from '../../images/whiteBg.jpeg';
import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeAltIcon,
  LocationMarkerIcon,
} from '@heroicons/react/outline';

const dateConversion = (date) => {
  const mounthArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dateArr = date.split('-');
  const dayNumberArr = dateArr[2].split('');
  if (dayNumberArr[0] === '0') {
    dateArr[2] = dayNumberArr[1];
  }
  return `${mounthArr[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
};

const Profile = () => {
  const state = useSelector((state) => state.userData);
  const avatarRef = ref(storage, `${state.email}/avatar/avatar`);
  const [avatarDb, setAvatarDb] = useState();
  const [avatarLoad, setAvatarLoad] = useState();

  useEffect(() => {
    setAvatarLoad(true);
    getDownloadURL(avatarRef)
      .then((url) => {
        setAvatarDb(url);
      })
      .catch((error) => {})
      .finally(() => setAvatarLoad(false));
  }, []);

  // const uploadAvatar = (event) => {
  //   const avatar = event.target.files[0];
  //   if (state) {
  //     const metadata = {
  //       contentType: avatar.type,
  //       name: 'avatar',
  //     };
  //     uploadBytes(avatarRef, avatar, metadata)
  //       .then(() => {
  //         getDownloadURL(avatarRef)
  //           .then((url) => {
  //             setAvatarDb(url);
  //           })
  //           .catch((error) => {})
  //           .finally(() => setAvatarLoad(false));
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // };

  return (
    <div className="w-full relative">
      <div className={styles.header}></div>
      <div className="flex absolute top-24 left-10">
        <div>
          <img
            className="w-32 h-32 rounded-full cursor-pointer"
            src={
              (avatarLoad && whiteBg) ||
              avatarDb ||
              (!avatarDb && defaultAvatar)
            }
            alt="avatar"
          />
        </div>
        <div className="ml-5 mt-4 tracking-wide">
          <p className="text-2xl text-gray-700">
            {state.firstName} {state.lastName}
          </p>
          <p className="text-sm ml-0.5 text-gray-100">{state.email}</p>
        </div>
      </div>
      <div className="flex w-full h-16">
        <div className={styles.empty}></div>
        <div className={styles.allCountsWrapper}>
          <div className={styles.countWrapper}></div>
          <div className={styles.countWrapper}></div>
          <div className={styles.countWrapper}></div>
          <div className={styles.countWrapper}></div>
        </div>
      </div>
      <div className="flex w-full mt-4">
        <div className={styles.personInfoWrapper}>
          <div className="text-lg flex justify-between items-center">
            <h4>About me</h4>
          </div>
          <div className="font-light text-sm text-gray-700 mt-4 mb-4">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
              quidem animi culpa dolores?
            </p>
          </div>
          <hr />
          <div className={styles.infoListWrapper}>
            {state.dateOfBirth && (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <CalendarIcon />
                </div>
                <div className={styles.textListWrapper}>
                  Born on {dateConversion(state.dateOfBirth)}
                </div>
              </div>
            )}
            {state.city && state.country && (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <LocationMarkerIcon />
                </div>
                <div className={styles.textListWrapper}>
                  {state.city}, {state.country}
                </div>
              </div>
            )}
            {state.site && (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <GlobeAltIcon />
                </div>
                <div className={styles.textListWrapper}>instagram.com</div>
              </div>
            )}
            {state.company && state.jobTitle && (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <BriefcaseIcon />
                </div>
                <div className={styles.textListWrapper}>
                  {state.jobTitle} at {state.company}
                </div>
              </div>
            )}
          </div>
          <hr />
          <div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-lg">
                <h4>Photos</h4>
              </div>
              <div className="text-gray-400 text-sm">
                <a href="/gallery">See all photos</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.postsWrapper}></div>
      </div>
    </div>
  );
};

export default Profile;
