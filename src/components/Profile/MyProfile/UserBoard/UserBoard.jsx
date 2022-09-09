import React from 'react';
import MyPost from '../../../Posts/MyPost/MyPost';
import styles from './UserBoard.module.scss';
import { useForm } from 'react-hook-form';
import ApiService from '../../../../services/ApiService';
import { useEffect } from 'react';
import { useState } from 'react';

const UserBoard = () => {
  let [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    ApiService.createPost(data)
      .then(() => {
        reset();
        ApiService.getPosts().then((data) => setPosts(data.data));
      })
      .catch((error) => console.log(error));
  };

  const updatePosts = (data) => setPosts(data);

  useEffect(() => {
    setLoading(true);
    ApiService.getPosts()
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
    <div className="ml-8 p-5 rounded-lg w-full border border-gray-300">
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Enter your message"
          className={styles.createPostInput}
          {...register('postData', { required: true })}
        />
        <button type="submit">Publish post</button>
      </form>
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

export default UserBoard;
