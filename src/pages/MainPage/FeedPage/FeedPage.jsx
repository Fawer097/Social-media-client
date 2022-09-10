import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyPost from '../../../components/Posts/MyPost/MyPost';
import OtherUserPost from '../../../components/Posts/OtherUserPost/OtherUserPost';
import { db } from '../../../firebase';
import postsService from '../../../services/postsService';
import { collection, query, onSnapshot } from 'firebase/firestore';

const Feed = () => {
  const { uid } = useSelector((state) => state.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full">
      <div className="mx-4 p-4 w-full h-full border border-gray-300 rounded-t-lg">
        {posts.length ? (
          posts.map((post) =>
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
      <div className="min-w-[240px] border border-gray-300 rounded-tl-lg"></div>
    </div>
  );
};

export default Feed;
