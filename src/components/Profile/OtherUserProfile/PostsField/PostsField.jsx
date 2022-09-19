import React from 'react';
import OtherUserPost from '../../../Posts/OtherUserPost/OtherUserPost';
import postsService from '../../../../services/postsService';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader';
import EmptyMessage from '../../../EmptyMessage/EmptyMessage';

const PostsField = (props) => {
  const { uid } = useSelector((state) => state.otherUser);
  let [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  if (!props.userData) {
    return;
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
      {posts.length ? (
        posts.map((post) => (
          <OtherUserPost
            key={post.createdAt._seconds}
            postData={post}
            userData={props.userData}
          />
        ))
      ) : (
        <EmptyMessage message="This user has no posts yet." />
      )}
    </div>
  );
};

export default PostsField;
