import React from 'react';
import styles from './UpdateCommentForm.module.scss';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import postsService from '../../../../services/postsService';

const UpdateCommentForm = (props) => {
  const { register, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      message: props.commentData.message,
    },
  });

  const onSubmit = (data) => {
    if (!data.message) {
      return;
    }

    data = {
      message: data.message,
      commentId: props.commentData.commentId,
      postId: props.postData.postId,
      ownerUid: props.postData.uid,
    };

    postsService.updateComment(data).then((data) => {
      props.openUpdateForm(false);
      props.updateThisComment(data.data);
    });
  };

  return (
    <form className="w-full pl-1 pr-6 mb-0.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center w-full h-10">
        <input
          type="text"
          placeholder="Write a comment..."
          className={styles.updateCommentInput}
          {...register('message')}
        />
        <button
          type="submit"
          className="w-6 ml-8 hover:scale-110 active:scale-90 duration-300"
        >
          <PaperAirplaneIcon />
        </button>
      </div>
    </form>
  );
};

export default UpdateCommentForm;
