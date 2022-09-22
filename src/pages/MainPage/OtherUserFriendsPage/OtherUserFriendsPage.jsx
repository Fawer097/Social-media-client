import React, { useEffect } from 'react';
import styles from './OtherUserFriendsPage.module.scss';
import OtherUserFriendCard from '../../../components/Friends/OtherUserFriendCard/OtherUserFriendCard';
import { useState } from 'react';
import friendsService from '../../../services/friendsService';
import Loader from '../../../components/Loader/Loader';
import SearchInput from '../../../components/Friends/SearchInput/SearchInput';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';

const OtherUserFriendsPage = (props) => {
  const { uid } = props;
  const [loading, setLoading] = useState();
  const [friendsData, setFriendsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderQuery, setGenderQuery] = useState('');

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
    <div className={styles.wrapper}>
      <div className="mx-4 p-4 w-full h-full">
        <div className="flex mx-6 mt-1.5 tracking-wide pb-2 relative text-gray-800">
          <h3>All friends</h3>
          <span className="ml-2 text-gray-400">{friendsData.length}</span>
        </div>
        <hr />
        <div>
          {friendsData.length ? (
            <div className="mt-6">
              <SearchInput
                searchQuery={setSearchQuery}
                genderQuery={setGenderQuery}
                placeholder="Search users..."
              />
              {friendsService
                .friendsFilter(friendsData, searchQuery, genderQuery)
                .map((friend) => (
                  <OtherUserFriendCard key={friend.uid} data={friend} />
                ))}
            </div>
          ) : (
            <EmptyMessage message="This user don't have any friends yet." />
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUserFriendsPage;
