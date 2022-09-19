import React, { useState } from 'react';
import { XCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import styles from './MessageInput.module.scss';
import messagerService from '../../../services/messagerService';
import { useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase';

const MessageInput = () => {
  const { uid } = useSelector((state) => state.userData);
  const { activeChat } = useSelector((state) => state.messagerData);
  const [messageImage, setMessageImage] = useState('');
  const imageRef = ref(storage, `${uid}/messager/${Date.now()}`);

  const { register, handleSubmit, reset, setValue } = useForm({
    mode: 'onSubmit',
  });

  const uploadImage = (event) => {
    const image = event.target.files[0];
    const metadata = {
      contentType: image.type,
    };

    uploadBytes(imageRef, image, metadata).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setMessageImage(url);
        setValue('imageUrl', url);
      });
    });
  };

  const onSubmit = (data) => {
    let { message, imageUrl } = data;
    if (message && !imageUrl.length) {
      data = { message, imageUrl: '' };
    } else if (!message && imageUrl.length) {
      data = { message: '', imageUrl };
    } else if (!message && !imageUrl.length) {
      return;
    }

    messagerService.sendMessage(activeChat, data).then(() => {
      setMessageImage('');
      reset();
    });
  };

  const deleteImage = () => {
    setMessageImage('');
    setValue('imageUrl', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {messageImage && (
        <div className="mb-4 ml-3">
          <XCircleIcon
            className="w-6 mb-1 cursor-pointer hover:scale-110 duration-200 active:scale-100"
            onClick={deleteImage}
          />
          <img
            src={messageImage}
            alt="Post image"
            className="max-w-[300px] max-h-[150px] rounded-lg"
          ></img>
        </div>
      )}
      <div className="flex w-full items-center py-4">
        <label htmlFor="messageImage">
          <PhotoIcon className="w-7 mr-4 text-gray-600 cursor-pointer hover:scale-105 duration-200" />
        </label>
        <input
          type="file"
          accept="image/*"
          name="messageImage"
          id="messageImage"
          className="hidden"
          {...register('imageUrl', { onChange: uploadImage })}
        ></input>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Send message..."
          className={styles.messageInput}
          {...register('message')}
        />
        <button type="submit" className={styles.button}>
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
