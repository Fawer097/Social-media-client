import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setOtherUserData } from '../../../redux/slices/otherUserSlice';
import ApiService from '../../../services/ApiService';
import FriendsService from '../../../services/FriendsService';

const FriendRequestCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openUserProfile = (uid) => {
    ApiService.getOtherUserData(uid)
      .then((data) => {
        dispatch(setOtherUserData(data.data));
        navigate(`/profile${data.data.uid}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center w-full h-28 border-b px-6 border-gray-200 relative">
      <div>
        <img
          className="w-20 h-20 rounded-full border border-gray-300 cursor-pointer"
          src={
            props.userData.avatarUrl ? props.userData.avatarUrl : defaultAvatar
          }
          alt="avatar"
          onClick={() => openUserProfile(props.userData.uid)}
        />
      </div>
      <div className="h-full ml-6 pt-6">
        <p
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={() => openUserProfile(props.userData.uid)}
        >
          {props.userData.fullName}
        </p>
        <p className="text-gray-500 text-sm mt-0.5">
          {props.userData.city}
          {props.userData.city && props.userData.country && ', '}
          {props.userData.country}
        </p>
      </div>
      <div className="flex flex-col absolute right-10">
        <button
          onClick={() => FriendsService.friendsRequest(props.userData.uid)}
        >
          Add as Friend
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
