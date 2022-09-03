import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import UserBoard from './UserBoard/UserBoard';
import styles from './OtherUserProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import ApiService from '../../services/ApiService';
import { setFriendCandidate } from '../../redux/slices/otherUserSlice';

const OtherUserProfile = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const friendRequest = () => {
    ApiService.friendRequest(state.otherUserData.uid)
      .then((data) => dispatch(setFriendCandidate(data.data)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full relative">
      <Header userData={props.userData} />
      <div className="flex w-full h-20">
        <div className="flex items-end justify-between px-4 max-w-[300px] w-1/2 h-full">
          <button className={styles.button}>Send a message</button>
          {state.otherUserData.friendsCandidates &&
          state.otherUserData.friendsCandidates.includes(state.userData.uid) ? (
            <button
              className={styles.button}
              disabled={true}
              onClick={friendRequest}
            >
              Request sent
            </button>
          ) : (
            <button className={styles.button} onClick={friendRequest}>
              Add as friend
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
