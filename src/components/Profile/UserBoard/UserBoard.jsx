import React from 'react';
import { useSelector } from 'react-redux';
import MyPost from '../../Posts/MyPost';
import OtherUserPost from '../../Posts/OtherUserPost';
import styles from './UserBoard.module.scss';
import { useForm } from 'react-hook-form';
import ApiService from '../../../services/ApiService';
import { useEffect } from 'react';
import { useState } from 'react';

const UserBoard = (props) => {
  const { uid } = useSelector((state) => state.userData);
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

  if (!props.userData) {
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ml-8 p-5 rounded-lg w-full border border-gray-300">
      {uid === props.userData.uid ? (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your message"
            className={styles.createPostInput}
            {...register('postData', { required: true })}
          />
          <button type="submit">Publish post</button>
        </form>
      ) : null}
      {posts.length ? (
        posts.map((post) => (
          <MyPost key={post.createdAt._seconds} postData={post} />
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
