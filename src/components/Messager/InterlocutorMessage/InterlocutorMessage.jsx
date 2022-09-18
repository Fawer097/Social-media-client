import React from 'react';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import userService from '../../../services/userService';
import styles from './InterlocutorMessage.module.scss';

const InterlocutorMessage = (props) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <img
          src={
            props.userData.avatarUrl ? props.userData.avatarUrl : defaultAvatar
          }
          alt="avatar"
          className="w-9 h-9 rounded-full"
        />
      </div>
      <div className="ml-3 text-sm overflow-scroll">
        <p className="text-darkGreen">{props.userData.fullName}</p>
        <p className="text-gray-700 w-56">{props.messageData.message}</p>
        {props.messageData.imageUrl && (
          <div className="mt-2">
            <img
              src={props.messageData.imageUrl}
              alt="Message image"
              className="max-w-[300px]"
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
