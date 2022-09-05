import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';
import FriendCard from '../FriendCard/FriendCard';
import { useSelector } from 'react-redux';

const FriendsBoard = () => {
  const { friends } = useSelector((state) => state.friendsData);

  return (
    <>
      {friends.length ? (
        <div className="mt-6">
          <div className="w-full border-b border-gray-200 mb-4 h-10">
            <input
              type="search"
              placeholder="Find friends"
              className="w-full h-3/4 px-6 outline-none"
            />
          </div>
          {friends.map((friend, index) => {
            return <FriendCard key={friend.uid} userData={friend} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mt-8 text-gray-400">
          <EmojiSadIcon className="w-8 mb-2" />
          <p className="w-60">
            You don't have any friends yet. Use search to find them.
          </p>
        </div>
      )}
    </>
  );
};

export default FriendsBoard;
