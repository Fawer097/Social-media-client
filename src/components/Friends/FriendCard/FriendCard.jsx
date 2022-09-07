import React from 'react';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../../services/ApiService';
import { setOtherUserData } from '../../../redux/slices/otherUserSlice';
import { useDispatch } from 'react-redux';
import { setMessageModal } from '../../../redux/slices/modalsSlice';

const FriendCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openMessageModal = () => {
    ApiService.getOtherUserData(props.data.uid)
      .then((data) => {
        dispatch(setOtherUserData(data.data));
        dispatch(setMessageModal({ active: true }));
      })
      .catch((error) => console.log(error));
  };

  const openOtherUserProfile = () => {
    ApiService.getOtherUserData(props.data.uid)
      .then((data) => {
        dispatch(setOtherUserData(data.data));
        navigate(`/profile${data.data.uid}`);
      })
      .catch((error) => console.log(error));
  };

  if (!props.data) {
    return null;
  }

  return (
    <div className="flex items-center w-full h-28 border-b px-6 border-gray-200 relative">
      <div>
        <img
          className="w-20 h-20 rounded-full cursor-pointer"
          src={props.data.avatarUrl ? props.data.avatarUrl : defaultAvatar}
          alt="avatar"
          onClick={openOtherUserProfile}
        />
      </div>
      <div className="h-full ml-6 pt-6">
        <p
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={openOtherUserProfile}
        >
          {props.data.fullName}
        </p>
        <p className="text-gray-500 text-sm mt-0.5">
          {props.data.city}
          {props.data.city && props.data.country && ', '}
          {props.data.country}
        </p>
      </div>
      <div className="flex flex-col absolute right-10">
        <button onClick={openMessageModal}>Message</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default FriendCard;
