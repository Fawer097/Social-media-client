import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setActiveChat } from '../../../redux/slices/messagerSlice';
import styles from './ChatCard.module.scss';
import { useState } from 'react';
import messagerService from '../../../services/messagerService';

const ChatCard = (props) => {
  const { fullName, uid, avatarUrl, lastMessage, imageUrl } = props.data;
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const deleteChat = (event) => {
    event.stopPropagation();
    messagerService.deleteChat(uid);
  };

  const dispatch = useDispatch();
  return (
    <div
      className={styles.wrapper}
      onClick={() => dispatch(setActiveChat(uid))}
      onMouseOver={() => setShowDeleteIcon(true)}
      onMouseOut={() => setShowDeleteIcon(false)}
    >
      <div>
        <img
          className="w-12 h-12 rounded-full "
          src={avatarUrl ? avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className="ml-4">
        <p className="text-gray-700">{fullName}</p>
        <p className="text-gray-400 text-sm max-w-[300px] h-5 overflow-hidden">
          {imageUrl && lastMessage ? lastMessage : null}
          {!imageUrl && lastMessage ? lastMessage : null}
          {imageUrl && !lastMessage ? 'Image' : null}
        </p>
      </div>
      {showDeleteIcon && (
        <div
          className="w-8 text-gray-600 absolute right-8 hover:scale-110 active:scale-100 duration-200 z-20"
          onClick={deleteChat}
        >
          <XCircleIcon />
        </div>
      )}
    </div>
  );
};

export default ChatCard;
