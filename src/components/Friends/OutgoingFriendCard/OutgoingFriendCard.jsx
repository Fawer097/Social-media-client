import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import friendsService from '../../../services/friendsService';

const OutgoingFriendCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openUserProfile = () => {
    dispatch(setOtherUser(props.data.uid));
    navigate(`/profile${props.data.uid}`);
  };

  const removeOutgoingRequest = () => {
    friendsService.removeOutgoingRequest(props.data.uid).then(() => {
      friendsService
        .getOutgoingCandidatesData()
        .then((data) => props.updateCandidates(data.data));
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
        <button onClick={removeOutgoingRequest}>Remove request</button>
      </div>
    </div>
  );
};

export default OutgoingFriendCard;
