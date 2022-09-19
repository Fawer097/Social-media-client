import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyPost from '../../../components/Posts/MyPost/MyPost';
import OtherUserPost from '../../../components/Posts/OtherUserPost/OtherUserPost';
import postsService from '../../../services/postsService';
import userService from '../../../services/userService';
import messagerService from '../../../services/messagerService';
import Loader from '../../../components/Loader/Loader';
import styles from './FeedPage.module.scss';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';

const Feed = () => {
  const { uid } = useSelector((state) => state.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputQuery, setInputQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    postsService
      .getFeedPosts()
      .then((data) => setPosts(data.data))
      .finally(() => setLoading(false));
  }, []);

  const updateFeedPosts = () =>
    postsService.getFeedPosts().then((data) => setPosts(data.data));

  if (posts.length) {
    posts.sort(
      (prev, next) => next.createdAt._seconds - prev.createdAt._seconds
    );
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader size={32} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {posts.length ? (
        <div className="w-full border-b border-gray-200 mb-4 h-10 text-gray-800">
          <input
            type="search"
            placeholder="Search posts..."
            className="w-full h-full px-6 outline-none"
            onChange={(event) => setInputQuery(event.target.value)}
          />
        </div>
      ) : null}
      {posts.length ? (
        (userService.filterUsers(posts, inputQuery).length
          ? userService.filterUsers(posts, inputQuery)
          : messagerService.filterMessages(posts, inputQuery)
        ).map((post) =>
          post.uid === uid ? (
            <MyPost
              key={post.createdAt._seconds}
              postData={post}
              updateFeedPosts={updateFeedPosts}
            />
          ) : (
            <OtherUserPost
              key={post.createdAt._seconds}
              postData={post}
              userData={post}
            />
          )
        )
      ) : (
        <EmptyMessage message="No news yet." />
      )}
    </div>
  );
};

export default Feed;
