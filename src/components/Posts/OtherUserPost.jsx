import React from 'react';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';

const OtherUserPost = () => {
  return (
    <div className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl">
      <div className="flex items-center relative">
        <div>
          <img
            className="w-14 h-14 rounded-full border border-gray-300"
            src=""
            alt="avatar"
          />
        </div>
        <div className="ml-4">
          <p className="text-gray-800">Vadzim Domnenka</p>
          <p className="text-gray-400 text-sm">4 minutes ago</p>
        </div>
      </div>
      <div className="my-4">Привет всем!!!</div>
      <div className="flex">
        <div className="flex">
          <HeartIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">17</p>
        </div>
        <div className="flex ml-4">
          <ChatAltIcon className="w-6 text-gray-400" />
          <p className="ml-1 text-gray-800">2</p>
        </div>
      </div>
    </div>
  );
};

export default OtherUserPost;
