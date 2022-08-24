import React from 'react';
import styles from './Profile.module.scss';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../images/defaultAvatar.jpeg';
import { ref } from 'firebase/storage';
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
import UserService from '../../services/UserService';

const Profile = () => {
  const state = useSelector((state) => state.userData);
  const avatarRef = ref(storage, `${state.uid}/avatar/avatar`);
  const [avatarUrl, setAvatarUrl] = useState();
  const [avatarLoad, setAvatarLoad] = useState();

  useEffect(() => {
    UserService.showAvatar(avatarRef, setAvatarUrl, setAvatarLoad);
  }, []);

  return (
    <div className="w-full relative">
      <div className={styles.header}></div>
      <div className="flex absolute top-24 left-10">
        <div>
          <img
            className="w-32 h-32 rounded-full cursor-pointer"
            src={
              (avatarLoad && whiteBg) ||
              avatarUrl ||
              (!avatarUrl && defaultAvatar)
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
            <p>{state.about}</p>
          </div>
          <hr />
          <div className={styles.infoListWrapper}>
            <div className={styles.listItemWrapper}>
              <div className={styles.iconWrapper}>
                <CalendarIcon />
              </div>
              <div className={styles.textListWrapper}>
                Born on {UserService.dateConversion(state.dateOfBirth)}
              </div>
            </div>
            {state.city || state.country ? (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <LocationMarkerIcon />
                </div>
                <div className={styles.textListWrapper}>
                  {state.city}
                  {state.city && state.country && ', '}
                  {state.country}
                </div>
              </div>
            ) : null}
            {state.site && (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <GlobeAltIcon />
                </div>
                <div className={styles.textListWrapper}>
                  <a href="state.site" target="_blank">
                    {state.site}
                  </a>
                </div>
              </div>
            )}
            {state.company || state.post ? (
              <div className={styles.listItemWrapper}>
                <div className={styles.iconWrapper}>
                  <BriefcaseIcon />
                </div>
                <div className={styles.textListWrapper}>
                  {state.post}
                  {state.company && state.post && ' at '}
                  {state.company}
                </div>
              </div>
            ) : null}
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
