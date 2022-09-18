import React from 'react';
import MyPost from '../../../Posts/MyPost/MyPost';
import postsService from '../../../../services/postsService';
import { useEffect } from 'react';
import { useState } from 'react';
import PostInput from '../../../Posts/MyPost/PostInput/PostInput';
import { useSelector } from 'react-redux';

const PostsField = () => {
  const { uid } = useSelector((state) => state.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const updatePosts = (data) => setPosts(data);

  useEffect(() => {
    setLoading(true);
    postsService
      .getPosts(uid)
      .then((data) => setPosts(data.data))
      .finally(() => setLoading(false));
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
    <div
      className="ml-8 p-5 rounded-lg w-full border border-gray-300"
      id="posts-field"
    >
      <PostInput updatePosts={updatePosts} />
      {posts.length ? (
        posts.map((post) => (
          <MyPost
            key={post.createdAt._seconds}
            postData={post}
            updatePosts={updatePosts}
          />
        ))
      ) : (
        <div className="flex justify-center mt-8 text-gray-400">
          <p>You don't have any entries yet.</p>
        </div>
      )}
    </div>
  );
};

export default PostsField;
