import React from 'react';
import FriendCard from '../../../components/Friends/FriendCard/FriendCard';
import FriendsFilter from '../../../components/Friends/FriendsFilter/FriendsFilter';
import { EmojiSadIcon } from '@heroicons/react/outline';

const FriendsPage = () => {
  const friendsArr = [];

  return (
    <div className="flex w-full">
      <div className="mx-4 p-4 w-full h-full border border-gray-300 rounded-t-lg">
        {friendsArr.length ? (
          <div>
            <div className="w-full border-b border-gray-200 h-10">
              <input
                type="search"
                placeholder="Find friends"
                className="w-full h-3/4 px-2 outline-none"
              />
            </div>
            {friendsArr.map((friend, index) => {
              return <FriendCard key={friend.fullName} userData={friend} />;
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
      </div>
      <FriendsFilter />
    </div>
  );
};

export default FriendsPage;
