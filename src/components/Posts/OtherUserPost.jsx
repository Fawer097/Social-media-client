import React from 'react';
import { ChatBubbleOvalLeftIcon, HeartIcon } from '@heroicons/react/24/outline';
import defaultAvatar from '../../images/defaultAvatar.jpeg';
import UserService from '../../services/UserService';

const OtherUserPost = (props) => {
  return (
    <div className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl">
      <div className="flex items-center relative">
        <div>
          <img
            className="w-12 h-12 rounded-full"
            src={
              props.userData.avatarUrl
                ? props.userData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">{props.userData.fullName}</p>
          <p className="text-gray-400 text-sm">
            {UserService.postTimestampConversion(
              props.postData.createdAt._seconds
            )}
          </p>
        </div>
      </div>
      <div className="my-4">{props.postData.postData}</div>
      <div className="flex">
        <div className="flex">
          <HeartIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">{props.postData.likes.length}</p>
        </div>
        <div className="flex ml-4">
          <ChatBubbleOvalLeftIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">{props.postData.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default OtherUserPost;
