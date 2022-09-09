import React from 'react';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import UserService from '../../../services/UserService';

const InterlocutorMessage = (props) => {
  return (
    <div className="flex w-fit m-2 px-4 py-1 border border-gray-100 rounded-xl relative">
      <div>
        <img
          src={
            props.userData.avatarUrl ? props.userData.avatarUrl : defaultAvatar
          }
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>
      <div className="ml-3 w-60 text-sm overflow-scroll">
        <p className="text-darkGreen">{props.userData.fullName}</p>
        <p className="text-gray-700">{props.messageData.message}</p>
      </div>
      <div className="text-gray-400 font-extralight text-[9px] absolute right-2">
        <p>
          {UserService.messageTimestampConversion(
            props.messageData.createdAt.seconds
          )}
        </p>
      </div>
    </div>
  );
};

export default InterlocutorMessage;
