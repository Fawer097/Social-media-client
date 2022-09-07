import { EmojiSadIcon } from '@heroicons/react/outline';
import React from 'react';
import FriendCard from '../FriendCard/FriendCard';
import { useEffect } from 'react';
import ApiService from '../../../services/ApiService';
import { useState } from 'react';

const FriendsBoard = () => {
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiService.getFriendsData()
      .then((data) => setFriendsData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {friendsData.length ? (
        <div className="mt-6">
          <div className="w-full border-b border-gray-200 mb-4 h-10">
            <input
              type="search"
              placeholder="Find friends"
              className="w-full h-3/4 px-6 outline-none"
            />
          </div>
          {friendsData.map((friend) => (
            <FriendCard key={friend.uid} data={friend} />
          ))}
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
