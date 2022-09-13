import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import messagerService from '../../../services/messagerService';
import userService from '../../../services/userService';

const MyMessage = (props) => {
  const { message, imageUrl, messageId, createdAt } = props.messageData;
  const { userData } = useSelector((state) => state);
  const { activeChat } = useSelector((state) => state.messagerData);
  const [showTrashIcon, setShowTrashIcon] = useState(false);

  return (
    <div
      className="flex w-fit m-2 px-6 py-1 border border-gray-100 rounded-xl relative"
      onMouseOver={() => setShowTrashIcon(true)}
      onMouseOut={() => setShowTrashIcon(false)}
    >
      <div>
        <img
          src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>
      <div className="ml-3 text-sm overflow-scroll">
        <p className="text-darkGreen">{userData.fullName}</p>
        <p className="text-gray-700 w-56">{message}</p>
        {imageUrl && (
          <div className="mt-2">
            <img src={imageUrl} alt="Message image" className="max-w-[300px]" />
          </div>
        )}
      </div>
      <div className="text-gray-400 font-extralight text-[9px] absolute right-2">
        <p>{userService.messageTimestampConversion(createdAt.seconds)}</p>
      </div>
      <div className="flex text-gray-600 justify-end items-start absolute w-10 h-10 -right-7">
        {showTrashIcon && (
          <TrashIcon
            className="w-5 cursor-pointer hover:scale-110 active:scale-100 duration-200"
            onClick={() => messagerService.deleteMessage(activeChat, messageId)}
          />
        )}
      </div>
    </div>
  );
};

export default MyMessage;
