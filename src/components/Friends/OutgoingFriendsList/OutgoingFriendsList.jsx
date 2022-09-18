import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import friendsService from '../../../services/friendsService';
import OutgoingFriendCard from '../OutgoingFriendCard/OutgoingFriendCard';
import SearchInput from '../SearchInput/SearchInput';
import Loader from '../../Loader/Loader';

const OutgoingFriendsList = () => {
  const [candidatesData, setCandidatesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderQuery, setGenderQuery] = useState('');

  const updateCandidates = (data) => setCandidatesData(data);

  useEffect(() => {
    setLoading(true);
    friendsService
      .getOutgoingCandidatesData()
      .then((data) => setCandidatesData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader size={32} />
      </div>
    );
  }

  return (
    <>
      {candidatesData.length ? (
        <div className="mt-6">
          <SearchInput
            searchQuery={setSearchQuery}
            genderQuery={setGenderQuery}
            placeholder="Find users"
          />
          {friendsService
            .friendsFilter(candidatesData, searchQuery, genderQuery)
            .map((candidate) => (
              <OutgoingFriendCard
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

export default OutgoingFriendsList;
