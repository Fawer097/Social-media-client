import React from 'react';
import MyPost from '../../../Posts/MyPost/MyPost';
import postsService from '../../../../services/postsService';
import { useEffect } from 'react';
import { useState } from 'react';
import PostInput from '../../../Posts/MyPost/PostInput/PostInput';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader';
import EmptyMessage from '../../../EmptyMessage/EmptyMessage';

const PostsField = () => {
  const { uid } = useSelector((state) => state.userData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    postsService
      .getPosts(uid)
      .then((data) => setPosts(data.data))
      .finally(() => setLoading(false));
  }, []);

  const updatePosts = (data) => setPosts(data);

  if (posts.length) {
    posts.sort(
      (prev, next) => next.createdAt._seconds - prev.createdAt._seconds
    );
  }

  if (loading) {
    return (
      <div className="w-full flex items-start justify-center">
        <Loader size={20} />
      </div>
    );
  }

  return (
    <div
      className="ml-8 px-4 pb-4 w-full border-l border-gray-200"
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
        <EmptyMessage message="You don't have any entries yet." />
      )}
    </div>
  );
};

export default PostsField;
