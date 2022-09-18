import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyPost from '../../../components/Posts/MyPost/MyPost';
import OtherUserPost from '../../../components/Posts/OtherUserPost/OtherUserPost';
import { db } from '../../../firebase';
import postsService from '../../../services/postsService';
import { collection, query, onSnapshot } from 'firebase/firestore';
import userService from '../../../services/userService';
import messagerService from '../../../services/messagerService';
import Loader from '../../../components/Loader/Loader';
import styles from './FeedPage.module.scss';

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

  useEffect(() => {
    const q = query(collection(db, 'Posts'));
    onSnapshot(q, () =>
      postsService.getFeedPosts().then((data) => setPosts(data.data))
    );
  }, []);

  if (posts.length) {
    posts.sort(
      (prev, next) => next.createdAt._seconds - prev.createdAt._seconds
    );
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="w-full border-b border-gray-200 mb-4 h-10">
        <input
          type="search"
          placeholder="Find posts"
          className="w-full h-3/4 px-6 outline-none"
          onChange={(event) => setInputQuery(event.target.value)}
        />
      </div>
      {posts.length ? (
        (userService.filterUsers(posts, inputQuery).length
          ? userService.filterUsers(posts, inputQuery)
          : messagerService.filterMessages(posts, inputQuery)
        ).map((post) =>
          post.uid === uid ? (
            <MyPost key={post.createdAt._seconds} postData={post} />
          ) : (
            <OtherUserPost
              key={post.createdAt._seconds}
              postData={post}
              userData={post}
            />
          )
        )
      ) : (
        <div className="flex justify-center mt-8 text-gray-400">
          <p>No news yet.</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
