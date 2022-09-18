import React from 'react';
import { useState } from 'react';
import FriendsList from '../../../components/Friends/FriendsList/FriendsList';
import IncomingFriendsList from '../../../components/Friends/IncomingFriendsList/IncomingFriendsList';
import styles from './FriendsPage.module.scss';
import OutgoingFriendsList from '../../../components/Friends/OutgoingFriendsList/OutgoingFriendsList';
import { useSelector } from 'react-redux';

const FriendsPage = () => {
  const [section, setSection] = useState('friends');
  const { friends, incomingRequests } = useSelector((state) => state.counters);

  return (
    <div className={styles.wrapper}>
      <div className="mx-4 p-4 w-full h-full">
        <div className="mx-6 mt-1.5">
          <ul className="flex justify-between w-[460px] tracking-wide">
            <li
              onClick={() => setSection('friends')}
              className={
                section === 'friends'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              <div className="flex">
                <h3>All friends</h3>
                <span className="ml-2 text-gray-400">{friends}</span>
              </div>
            </li>
            <li
              onClick={() => setSection('incomingRequests')}
              className={
                section === 'incomingRequests'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              <h3>Incoming requests</h3>
              {incomingRequests ? (
                <div className={styles.incomingRequestsCounter}>
                  {incomingRequests}
                </div>
              ) : null}
            </li>
            <li
              onClick={() => setSection('outgoingRequests')}
              className={
                section === 'outgoingRequests'
                  ? styles.activeSection
                  : styles.sectionName
              }
            >
              <h3>Outgoing requests</h3>
            </li>
          </ul>
        </div>
        <hr />
        {section === 'friends' && <FriendsList />}
        {section === 'incomingRequests' && <IncomingFriendsList />}
        {section === 'outgoingRequests' && <OutgoingFriendsList />}
      </div>
    </div>
  );
};

export default FriendsPage;
