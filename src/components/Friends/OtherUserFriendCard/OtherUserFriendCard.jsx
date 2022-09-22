import React from 'react';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useNavigate } from 'react-router-dom';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './OtherUserFriendCard.module.scss';
import { useEffect } from 'react';
import friendsService from '../../../services/friendsService';
import { useState } from 'react';

const OtherUserFriendCard = (props) => {
  const { data } = props;
  const { uid } = useSelector((state) => state.userData);
  const [friends, setFriends] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    friendsService.getFriendsUid(uid).then((data) => {
      const { friends } = data.data;
      setFriends(friends);
    });
  }, []);

  const openOtherUserProfile = () => {
    dispatch(setOtherUser(data.uid));
    navigate(`/profile${data.uid}`);
  };

  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img
          className="w-20 h-20 rounded-full cursor-pointer"
          src={data.avatarUrl ? data.avatarUrl : defaultAvatar}
          alt="avatar"
          onClick={openOtherUserProfile}
        />
      </div>
      <div className="h-full ml-6 pt-6">
        <p
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={openOtherUserProfile}
        >
          {data.fullName}
        </p>
        <p className="text-gray-500 text-sm mt-0.5">
          {data.city}
          {data.city && data.country && ', '}
          {data.country}
        </p>
      </div>
      <div className="flex flex-col absolute right-10">
        {friends.includes(data.uid) ? (
          <p className="text-gray-400">Your friend</p>
        ) : null}
      </div>
    </div>
  );
};

export default OtherUserFriendCard;
