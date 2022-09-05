import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import UserBoard from './UserBoard/UserBoard';
import styles from './OtherUserProfile.module.scss';
import { useSelector } from 'react-redux';
import FriendsService from '../../services/FriendsService';
import { CheckIcon } from '@heroicons/react/outline';

const OtherUserProfile = (props) => {
  let { friends, incomingRequests, outgoingRequests } = useSelector(
    (state) => state.friendsData
  );
  const { uid } = useSelector((state) => state.otherUserData);

  friends = friends.map((item) => item.uid);

  incomingRequests = incomingRequests.map((item) => item.uid);

  return (
    <div className="w-full relative">
      <Header userData={props.userData} />
      <div className="flex w-full h-20">
        <div className="flex items-end justify-between px-4 max-w-[300px] w-1/2 h-full">
          <button className={styles.button}>Send a message</button>

          {!friends.includes(uid) &&
            !incomingRequests.includes(uid) &&
            !outgoingRequests.includes(uid) && (
              <button
                className={styles.button}
                onClick={() => FriendsService.friendsRequest(uid)}
              >
                Add as friend
              </button>
            )}
          {outgoingRequests.includes(uid) && (
            <button className={styles.button} disabled={true}>
              Request sended
            </button>
          )}
          {incomingRequests.includes(uid) && (
            <button
              className={styles.button}
              onClick={() => FriendsService.friendsRequest(uid)}
            >
              Accept request
            </button>
          )}
          {friends.includes(uid) && (
            <button className={styles.button} disabled={true}>
              <CheckIcon className="w-5 mr-2" />
              Your friend
            </button>
          )}
        </div>
        <div className="flex ml-8 h-full">
          <Counter title={'Posts'} count={12} />
          <Counter title={'Friends'} count={28} />
          <Counter title={'Photos'} count={4} />
        </div>
      </div>
      <div className="flex w-full mt-4">
        <UserInfo userData={props.userData} />
        <UserBoard userData={props.userData} />
      </div>
    </div>
  );
};

export default OtherUserProfile;
