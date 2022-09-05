import React from 'react';
import FriendRequestCard from '../FriendRequestCard/FriendRequestCard';
import { useSelector } from 'react-redux';

const FriendsRequestsBoard = () => {
  const { incomingRequests } = useSelector((state) => state.friendsData);

  return (
    <>
      {incomingRequests && incomingRequests.length ? (
        <div className="mt-6">
          <div className="w-full border-b border-gray-200 mb-4 h-10">
            <input
              type="search"
              placeholder="Find person"
              className="w-full h-3/4 px-6 outline-none"
            />
          </div>
          {incomingRequests.map((candidate, index) => {
            return (
              <FriendRequestCard key={candidate.uid} userData={candidate} />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center mt-8 text-gray-400">
          <p className="w-60">No friend requests yet.</p>
        </div>
      )}
    </>
  );
};

export default FriendsRequestsBoard;
