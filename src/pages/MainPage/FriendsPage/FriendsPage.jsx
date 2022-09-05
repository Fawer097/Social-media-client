import React from 'react';
import { useState } from 'react';
import FriendsBoard from '../../../components/Friends/FriendsBoard/FriendsBoard';
import FriendsFilter from '../../../components/Friends/FriendsFilter/FriendsFilter';
import FriendsRequestsBoard from '../../../components/Friends/FriendsRequestsBoard/FriendsRequestsBoard';
import styles from './FriendsPage.module.scss';

const FriendsPage = () => {
  const [section, setSection] = useState('friends');

  return (
    <div className="flex w-full">
      <div className="mx-4 p-4 w-full h-full border border-gray-300 rounded-t-lg">
        <div className="mx-6 mt-1.5">
          <ul className="flex justify-between w-64 tracking-wide">
            <li
              onClick={() => setSection('friends')}
              className={
                section === 'friends'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              All friends
            </li>
            <li
              onClick={() => setSection('requests')}
              className={
                section === 'requests'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              Incoming requests
            </li>
          </ul>
        </div>
        <hr />
        {section === 'friends' && <FriendsBoard />}
        {section === 'requests' && <FriendsRequestsBoard />}
      </div>
      <FriendsFilter />
    </div>
  );
};

export default FriendsPage;
