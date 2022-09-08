import React from 'react';
import {
  ChatAltIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from '@heroicons/react/outline';
import defaultAvatar from '../../images/defaultAvatar.jpeg';

const MyPost = (props) => {
  if (!props.postData) {
    return null;
  }

  return (
    <div className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl">
      <div className="flex items-center relative">
        <div>
          <img
            className="w-12 h-12 rounded-full"
            src={
              props.postData.avatarUrl
                ? props.postData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">{props.postData.fullName}</p>
          <p className="text-gray-400 text-sm">
            {`${new Date(props.postData.createdAt._seconds * 1000)}`}
          </p>
        </div>

        <div className="w-5 text-gray-400 absolute right-4">
          <DotsHorizontalIcon />
        </div>
      </div>
      <div className="my-4 text-gray-800">{props.postData.postData}</div>
      <div className="flex">
        <div className="flex">
          <HeartIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">{props.postData.likes}</p>
        </div>
        <div className="flex ml-4">
          <ChatAltIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">{props.postData.comments}</p>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
