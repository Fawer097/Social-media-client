import React from 'react';
import IncomingFriendCard from '../IncomingFriendCard/IncomingFriendCard';
import { useState } from 'react';
import { useEffect } from 'react';
import ApiService from '../../../services/ApiService';

const IncomingFriendsList = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateCandidates = (data) => setCandidatesData(data);

  useEffect(() => {
    setLoading(true);
    ApiService.getCandidatesData()
      .then((data) => setCandidatesData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {candidatesData.length ? (
        <div className="mt-6">
          <div className="w-full border-b border-gray-200 mb-4 h-10">
            <input
              type="search"
              placeholder="Find user"
              className="w-full h-3/4 px-6 outline-none"
            />
          </div>
          {candidatesData.map((candidate) => (
            <IncomingFriendCard
              key={candidate.uid}
              data={candidate}
              updateCandidates={updateCandidates}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center mt-8 text-gray-400">
          <p>No friend requests yet.</p>
        </div>
      )}
    </>
  );
};

export default IncomingFriendsList;
