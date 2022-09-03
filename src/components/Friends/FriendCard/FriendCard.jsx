import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';

const FriendCard = (props) => {
  return (
    <div className="flex items-center w-full h-28 border-b border-gray-200 relative">
      <div>
        <Link to={`/${props.userData.uid}`}>
          <img
            className="w-20 h-20 rounded-full border border-gray-300"
            src={
              props.userData.avatarUrl
                ? props.userData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
          />
        </Link>
      </div>
      <div className="h-full ml-6 pt-6">
        <p className="text-gray-900">
          <Link to={`/${props.userData.uid}`}>
            {props.userData.firstName} {props.userData.lastName}
          </Link>
        </p>
        <p className="text-gray-500 text-sm mt-0.5">
          {props.userData.city}
          {props.userData.city && props.userData.country && ', '}
          {props.userData.country}
        </p>
      </div>
      <div className="flex flex-col absolute right-10">
        <button>Message</button>
        <button>Remove</button>
      </div>
    </div>
  );
};

export default FriendCard;
