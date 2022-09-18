import React from 'react';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useNavigate } from 'react-router-dom';
import friendsService from '../../../services/friendsService';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../../../redux/slices/modalsSlice';
import styles from './FriendCard.module.scss';

const FriendCard = (props) => {
  const { data, updateFriends } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMessageModal = () => {
    dispatch(setOtherUser(data.uid));
    dispatch(setMessageModal({ active: true }));
  };

  const openOtherUserProfile = () => {
    dispatch(setOtherUser(data.uid));
    navigate(`/profile${data.uid}`);
  };

  const removeFriend = () => {
    friendsService
      .removeFriend(data.uid)
      .then(() =>
        friendsService.getFriendsData().then((data) => updateFriends(data.data))
      );
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
        <p onClick={openMessageModal} className={styles.options}>
          Message
        </p>
        <p onClick={removeFriend} className={styles.options}>
          Remove
        </p>
      </div>
    </div>
  );
};

export default FriendCard;
