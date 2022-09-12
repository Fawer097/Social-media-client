import React from 'react';
import OtherUserPost from '../../../Posts/OtherUserPost/OtherUserPost';
import postsService from '../../../../services/postsService';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const UserBoard = (props) => {
  const { uid } = useSelector((state) => state.otherUser);
  let [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    postsService
      .getOtherUserPosts(uid)
      .then((data) => setPosts(data.data))
      .finally(() => setLoading(false));
  }, []);

  if (posts.length) {
    posts.sort(
      (prev, next) => next.createdAt._seconds - prev.createdAt._seconds
    );
  }

  if (!props.userData) {
    return;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ml-8 p-5 rounded-lg w-full border border-gray-300">
      {posts.length ? (
        posts.map((post) => (
          <OtherUserPost
            key={post.createdAt._seconds}
            postData={post}
            userData={props.userData}
          />
        ))
      ) : (
        <div className="flex justify-center mt-8 text-gray-400">
          <p>This user has no posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserBoard;
