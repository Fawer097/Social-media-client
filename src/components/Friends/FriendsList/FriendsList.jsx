import { FaceFrownIcon } from '@heroicons/react/24/outline';
import React from 'react';
import FriendCard from '../FriendCard/FriendCard';
import { useEffect } from 'react';
import friendsService from '../../../services/friendsService';
import { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import Loader from '../../Loader/Loader';
import EmptyMessage from '../../EmptyMessage/EmptyMessage';
import { useSelector } from 'react-redux';

const Friendslist = () => {
  const { uid } = useSelector((state) => state.userData);
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderQuery, setGenderQuery] = useState('');

  const updateFriends = (data) => setFriendsData(data);

  useEffect(() => {
    setLoading(true);
    friendsService
      .getFriendsData(uid)
      .then((data) => setFriendsData(data.data))
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
      {friendsData.length ? (
        <div className="mt-6">
          <SearchInput
            searchQuery={setSearchQuery}
            genderQuery={setGenderQuery}
            placeholder="Search friends..."
          />
          {friendsService
            .friendsFilter(friendsData, searchQuery, genderQuery)
            .map((friend) => (
              <FriendCard
                key={friend.uid}
                data={friend}
                updateFriends={updateFriends}
              />
            ))}
        </div>
      ) : (
        <EmptyMessage message="You don't have any friends yet. Use search to find them" />
      )}
    </>
  );
};

export default Friendslist;
