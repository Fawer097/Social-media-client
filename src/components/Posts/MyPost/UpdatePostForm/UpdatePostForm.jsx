import React from 'react';
import styles from './UpdatePostForm.module.scss';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import postsService from '../../../../services/postsService';
import { storage } from '../../../../firebase';

const UpdatePostForm = (props) => {
  const { uid } = useSelector((state) => state.userData);
  const [updatepostImage, setUpdatePostImage] = useState(
    props.postData.imageUrl
  );
  const imageRef = ref(storage, `${uid}/gallery/${Date.now()}`);

  const { register, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      message: props.postData.message,
      imageUrl: props.postData.imageUrl,
    },
  });

  const onSubmit = (data) => {
    let { message, imageUrl } = data;
    if (message && !imageUrl.length) {
      data = { message, imageUrl: '' };
    } else if (!message && imageUrl.length) {
      data = { message: '', imageUrl };
    } else if (!message && !imageUrl.length) {
      return;
    }

    data = {
      message,
      imageUrl,
      postId: props.postData.postId,
    };
    postsService.updatePost(data).then((data) => {
      props.openUpdateForm(false);
      props.updateThisPost(data.data);
      setUpdatePostImage('');
    });
  };

  const uploadImage = (event) => {
    const image = event.target.files[0];
    const metadata = {
      contentType: image.type,
    };
    uploadBytes(imageRef, image, metadata).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setUpdatePostImage(url);
        setValue('imageUrl', url);
      });
    });
  };

  const deleteImage = () => {
    setUpdatePostImage('');
    setValue('imageUrl', '');
  };

  return (
    <form className="w-full pl-1 pr-6" onSubmit={handleSubmit(onSubmit)}>
      {updatepostImage && (
        <div className="mb-4 ml-3">
          <XCircleIcon
            className="w-6 mb-1 cursor-pointer hover:scale-110 duration-200 active:scale-100"
            onClick={deleteImage}
          />
          <img
            src={updatepostImage}
            alt="Post image"
            className="max-w-[500px] max-h-[300px] rounded-lg"
          ></img>
        </div>
      )}
      <div className="flex items-center w-full h-10">
        <input
          type="text"
          placeholder="Enter your message"
          className={styles.updatePostInput}
          {...register('message')}
        />
        <label htmlFor="updatePostImage">
          <PhotoIcon className="w-6 -ml-8 text-gray-600 cursor-pointer" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="updatePostImage"
          id="updatePostImage"
          className="hidden"
          {...register('imageUrl', { onChange: uploadImage })}
        ></input>
        <button
          type="submit"
          className="w-6 ml-8 text-darkGreen hover:scale-110 active:scale-90 duration-300"
        >
          <PaperAirplaneIcon />
        </button>
      </div>
    </form>
  );
};

export default UpdatePostForm;
