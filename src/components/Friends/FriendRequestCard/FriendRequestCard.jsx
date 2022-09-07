import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setOtherUserData } from '../../../redux/slices/otherUserSlice';
import ApiService from '../../../services/ApiService';

const FriendRequestCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openUserProfile = () => {
    ApiService.getOtherUserData(props.data.uid)
      .then((data) => {
        dispatch(setOtherUserData(data.data));
        navigate(`/profile${data.data.uid}`);
      })
      .catch((error) => console.log(error));
  };

  const acceptRequest = () => {
    ApiService.friendsRequest(props.data.uid).then(() => {
      ApiService.getCandidatesData().then((data) =>
        props.updateCandidates(data.data)
      );
    });
  };

  if (!props.data) {
    return null;
  }

  return (
    <div className="flex items-center w-full h-28 border-b px-6 border-gray-200 relative">
      <div>
        <img
          className="w-20 h-20 rounded-full  cursor-pointer"
          src={props.data.avatarUrl ? props.data.avatarUrl : defaultAvatar}
          alt="avatar"
          onClick={openUserProfile}
        />
      </div>
      <div className="h-full ml-6 pt-6">
        <p
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={openUserProfile}
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
        <button onClick={acceptRequest}>Add as Friend</button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
