import React from 'react';
import { useSelector } from 'react-redux';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import defaultAvatar from '../../../../images/defaultAvatar.jpeg';
import { useForm } from 'react-hook-form';
import postsService from '../../../../services/postsService';

const CommentInput = (props) => {
  const { userData } = useSelector((state) => state);

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    postsService
      .createComment({ ...data, postData: props.postData })
      .then((data) => {
        props.updateComments(data.data);
        reset();
      });
  };

  return (
    <form
      className="flex items-center w-full px-4 py-2 mt-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <img
          src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <input
        type="text"
        placeholder="Write a comment..."
        className="w-5/6 text-sm ml-3 mr-6 p-1.5 border-b border-gray-300 outline-none"
        {...register('comment', { required: true })}
      ></input>
      <button type="submit" className="w-6 h-6">
        <PaperAirplaneIcon />
      </button>
    </form>
  );
};

export default CommentInput;
