import React from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import userService from '../../../services/userService';
import styles from './InterlocutorMessage.module.scss';
import { setImageModal } from '../../../redux/slices/modalsSlice';

const InterlocutorMessage = (props) => {
  const { userData, messageData } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div>
        <img
          src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>
      <div className="ml-3 text-sm overflow-scroll">
        <p className="text-darkGreen">{userData.fullName}</p>
        <p className="text-gray-700 w-56">{messageData.message}</p>
        {messageData.imageUrl && (
          <div className="mt-2">
            <img
              src={messageData.imageUrl}
              alt="Message image"
              className="max-w-[300px] rounded-lg my-2 cursor-pointer"
              onClick={() =>
                dispatch(
                  setImageModal({
                    active: true,
                    url: messageData.imageUrl,
                  })
                )
              }
            />
          </div>
        )}
      </div>
      <div className="text-gray-400 font-extralight text-[9px] absolute right-2">
        <p>
          {userService.messageTimestampConversion(
            props.messageData.createdAt.seconds
          )}
        </p>
      </div>
    </div>
  );
};

export default InterlocutorMessage;
