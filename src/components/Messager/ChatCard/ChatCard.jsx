import { XCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setActiveChat } from '../../../redux/slices/messagerSlice';
import styles from './ChatCard.module.scss';
import { useState } from 'react';
import { setDeleteChatModal } from '../../../redux/slices/modalsSlice';

const ChatCard = (props) => {
  const { fullName, uid, avatarUrl, lastMessage } = props.data;
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const dispatch = useDispatch();

  const deleteChat = (event) => {
    event.stopPropagation();
    dispatch(setDeleteChatModal({ active: true, uid }));
  };

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
        <p className="text-gray-700 mb-0.5">{fullName}</p>
        <div className="flex items-center text-gray-400 text-sm max-w-[300px] h-6 overflow-hidden">
          {lastMessage.avatarUrl !== false && (
            <img
              src={
                lastMessage.avatarUrl ? lastMessage.avatarUrl : defaultAvatar
              }
              alt="avatar"
              className="w-5 h-5 rounded-full mr-2"
            />
          )}
          <p>
            {lastMessage.imageUrl && lastMessage.message
              ? lastMessage.message
              : null}
            {!lastMessage.imageUrl && lastMessage.message
              ? lastMessage.message
              : null}
            {lastMessage.imageUrl && !lastMessage.message ? 'Image' : null}
          </p>
        </div>
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
