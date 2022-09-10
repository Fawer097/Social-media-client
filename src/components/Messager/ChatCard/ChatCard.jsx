import React from 'react';
import { useDispatch } from 'react-redux';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { setActiveChat } from '../../../redux/slices/messagerSlice';
import styles from './ChatCard.module.scss';

const ChatCard = (props) => {
  const dispatch = useDispatch();

  if (!props.data) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => dispatch(setActiveChat(props.data.uid))}
    >
      <div>
        <img
          className="w-12 h-12 rounded-full "
          src={props.data.avatarUrl ? props.data.avatarUrl : defaultAvatar}
          alt="avatar"
        />
      </div>
      <div className="ml-4">
        <p className="text-gray-700">{props.data.fullName}</p>
        <p className="text-gray-400 text-sm mt-0.5"></p>
      </div>
    </div>
  );
};

export default ChatCard;
