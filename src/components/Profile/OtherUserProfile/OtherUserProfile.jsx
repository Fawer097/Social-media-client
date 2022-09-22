import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import styles from './OtherUserProfile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CheckIcon } from '@heroicons/react/24/solid';
import { setMessageModal } from '../../../redux/slices/modalsSlice';
import friendsService from '../../../services/friendsService';
import userService from '../../../services/userService';
import { useEffect } from 'react';
import { useState } from 'react';
import PostsField from './PostsField/PostsField';
import postsService from '../../../services/postsService';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const OtherUserProfile = (props) => {
  const myUid = useSelector((state) => state.userData.uid);
  const otherUid = props.userData.uid;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [friendsCounter, setFriendsCounter] = useState(0);
  const [postsCounter, setPostsCounter] = useState(0);
  const [imagesCounter, setImagesCounter] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    userService
      .getOtherUserData(otherUid)
      .then((data) => {
        setUserData(data.data);
        friendsService.getFriendsUid(myUid).then((data) => {
          const { friends, incomingRequests, outgoingRequests } = data.data;
          setFriends(friends);
          setIncomingRequests(incomingRequests);
          setOutgoingRequests(outgoingRequests);
        });
      })
      .finally(() => setLoading(false));

    friendsService
      .getFriendsUid(otherUid)
      .then((data) => setFriendsCounter(data.data.friends.length));

    postsService.getPosts(otherUid).then((data) => {
      setPostsCounter(data.data.length);
      const images = data.data.filter((post) => post.imageUrl);
      setImagesCounter(images.length);
    });
  }, []);

  const friendRequest = () => {
    friendsService.friendRequest(otherUid).then(() => {
      friendsService.getFriendsUid(myUid).then((data) => {
        const { friends, incomingRequests, outgoingRequests } = data.data;
        setFriends(friends);
        setIncomingRequests(incomingRequests);
        setOutgoingRequests(outgoingRequests);
      });
    });
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader size={32} />
      </div>
    );
  }

  if (!props.userData) {
    return null;
  }

  return (
    <div className="w-full relative">
      <Header userData={userData} />
      <div className="flex w-full h-20">
        <div className="flex items-end justify-between px-4 max-w-[300px] w-1/2 h-full">
          <button
            className={styles.button}
            onClick={() => dispatch(setMessageModal({ active: true }))}
          >
            Send message
          </button>
          {!friends.includes(otherUid) &&
            !incomingRequests.includes(otherUid) &&
            !outgoingRequests.includes(otherUid) && (
              <button className={styles.button} onClick={friendRequest}>
                Add as friends
              </button>
            )}
          {outgoingRequests.includes(otherUid) &&
            !friends.includes(otherUid) &&
            !incomingRequests.includes(otherUid) && (
              <button className={styles.button} disabled={true}>
                Request sended
              </button>
            )}
          {incomingRequests.includes(otherUid) &&
            !friends.includes(otherUid) &&
            !outgoingRequests.includes(otherUid) && (
              <button className={styles.button} onClick={friendRequest}>
                Accept request
              </button>
            )}
          {friends.includes(otherUid) &&
            !outgoingRequests.includes(otherUid) &&
            !incomingRequests.includes(otherUid) && (
              <button className={styles.button} disabled={true}>
                <CheckIcon className="w-5 mr-2" />
                Your friend
              </button>
            )}
        </div>
        <div className="flex ml-8 h-full">
          <a href="#posts-field" className="hover:scale-105 duration-300">
            <Counter title={'Posts'} count={postsCounter} />
          </a>
          <Link
            to={`/friends${otherUid}`}
            className="hover:scale-105 duration-300"
          >
            <Counter title={'Friends'} count={friendsCounter} />
          </Link>
          <Link
            to={`/gallery${otherUid}`}
            className="hover:scale-105 duration-300"
          >
            <Counter title={'Images'} count={imagesCounter} />
          </Link>
        </div>
      </div>
      {incomingRequests.includes(otherUid) &&
      !friends.includes(otherUid) &&
      !outgoingRequests.includes(otherUid) ? (
        <div className="text-sm text-gray-400 h-5 mt-4 mx-6">
          This user wants to add you as a friend.
        </div>
      ) : (
        <div className="h-5 mt-4 mx-6"></div>
      )}
      <div className="flex w-full mt-4 pt-4">
        <UserInfo userData={userData} />
        <PostsField userData={userData} />
      </div>
    </div>
  );
};

export default OtherUserProfile;
