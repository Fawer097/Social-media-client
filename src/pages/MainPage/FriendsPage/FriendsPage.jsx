import React from 'react';
import { useState } from 'react';
import FriendsList from '../../../components/Friends/FriendsList/FriendsList';
import FriendsFilter from '../../../components/Friends/FriendsFilter/FriendsFilter';
import IncomingFriendsList from '../../../components/Friends/IncomingFriendsList/IncomingFriendsList';
import styles from './FriendsPage.module.scss';
import OutgoingFriendsList from '../../../components/Friends/OutgoingFriendsList/OutgoingFriendsList';

const FriendsPage = () => {
  const [section, setSection] = useState('friends');

  return (
    <div className="flex w-full">
      <div className="mx-4 p-4 w-full h-full border border-gray-300 rounded-t-lg">
        <div className="mx-6 mt-1.5">
          <ul className="flex justify-between w-[450px] tracking-wide">
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
              onClick={() => setSection('incomingRequests')}
              className={
                section === 'incomingRequests'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              Incoming requests
            </li>
            <li
              onClick={() => setSection('outgoingRequests')}
              className={
                section === 'outgoingRequests'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              Outgoing requests
            </li>
          </ul>
        </div>
        <hr />
        {section === 'friends' && <FriendsList />}
        {section === 'incomingRequests' && <IncomingFriendsList />}
        {section === 'outgoingRequests' && <OutgoingFriendsList />}
      </div>
      <FriendsFilter />
    </div>
  );
};

export default FriendsPage;
