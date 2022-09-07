import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import UserBoard from './UserBoard/UserBoard';
import styles from './OtherUserProfile.module.scss';
import { useDispatch } from 'react-redux';
import { CheckIcon } from '@heroicons/react/outline';
import { setMessageModal } from '../../redux/slices/modalsSlice';
import ApiService from '../../services/ApiService';
import { useEffect } from 'react';
import { useState } from 'react';

const OtherUserProfile = (props) => {
  const { uid } = props.userData;
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    ApiService.getAllFriendsData()
      .then((data) => {
        const { friends, incomingRequests, outgoingRequests } = data.data;
        setFriends(friends);
        setIncomingRequests(incomingRequests);
        setOutgoingRequests(outgoingRequests);
      })
      .finally(() => setLoading(false));
  }, []);

  const friendRequest = () => {
    ApiService.friendsRequest(uid).then(() => {
      ApiService.getAllFriendsData().then((data) => {
        const { friends, incomingRequests, outgoingRequests } = data.data;
        setFriends(friends);
        setIncomingRequests(incomingRequests);
        setOutgoingRequests(outgoingRequests);
      });
    });
  };

  if (!props.userData) {
    return null;
  }

  return (
    <div className="w-full relative">
      <Header userData={props.userData} />
      <div className="flex w-full h-20">
        <div className="flex items-end justify-between px-4 max-w-[300px] w-1/2 h-full">
          <button
            className={styles.button}
            onClick={() => dispatch(setMessageModal({ active: true }))}
          >
            Send message
          </button>
          {!friends.includes(uid) &&
            !incomingRequests.includes(uid) &&
            !outgoingRequests.includes(uid) && (
              <button className={styles.button} onClick={friendRequest}>
                Add as friend
              </button>
            )}
          {outgoingRequests.includes(uid) &&
            !friends.includes(uid) &&
            !incomingRequests.includes(uid) && (
              <button className={styles.button} disabled={true}>
                Request sended
              </button>
            )}
          {incomingRequests.includes(uid) &&
            !friends.includes(uid) &&
            !outgoingRequests.includes(uid) && (
              <button className={styles.button} onClick={friendRequest}>
                Accept request
              </button>
            )}
          {friends.includes(uid) &&
            !outgoingRequests.includes(uid) &&
            !incomingRequests.includes(uid) && (
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
