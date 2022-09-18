import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import friendsService from '../../../services/friendsService';
import styles from './OutgoingFriendCard.module.scss';

const OutgoingFriendCard = (props) => {
  const { data, updateCandidates } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openUserProfile = () => {
    dispatch(setOtherUser(data.uid));
    navigate(`/profile${data.uid}`);
  };

  const removeOutgoingRequest = () => {
    friendsService.removeOutgoingRequest(data.uid).then(() => {
      friendsService
        .getOutgoingCandidatesData()
        .then((data) => updateCandidates(data.data));
    });
  };

  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <img
          className="w-20 h-20 rounded-full  cursor-pointer"
          src={data.avatarUrl ? data.avatarUrl : defaultAvatar}
          alt="avatar"
          onClick={openUserProfile}
        />
      </div>
      <div className="h-full ml-6 pt-6">
        <p
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={openUserProfile}
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
        <button onClick={removeOutgoingRequest} className={styles.options}>
          Remove request
        </button>
      </div>
    </div>
  );
};

export default OutgoingFriendCard;
