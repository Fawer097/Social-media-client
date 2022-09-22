import { TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import messagerService from '../../../services/messagerService';
import userService from '../../../services/userService';
import styles from './MyMessage.module.scss';
import { setImageModal } from '../../../redux/slices/modalsSlice';

const MyMessage = (props) => {
  const { message, imageUrl, messageId, createdAt } = props.messageData;
  const { userData } = useSelector((state) => state);
  const { activeChat } = useSelector((state) => state.messagerData);
  const [showTrashIcon, setShowTrashIcon] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      className={styles.wrapper}
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
      <div className="ml-3 text-sm overflow-scroll font-light">
        <p className="text-gray-100">{userData.fullName}</p>
        <p className="text-white w-56">{message}</p>
        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl}
              alt="Message image"
              className="max-w-[300px] rounded-lg my-2 cursor-pointer"
              onClick={() =>
                dispatch(
                  setImageModal({
                    active: true,
                    url: imageUrl,
                  })
                )
              }
            />
          </div>
        )}
      </div>
      <div className="text-gray-100 font-extralight text-[9px] absolute right-2">
        <p>{userService.messageTimestampConversion(createdAt.seconds)}</p>
      </div>
      <div className="flex text-gray-600 justify-start items-start absolute w-10 h-10 -left-7">
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
