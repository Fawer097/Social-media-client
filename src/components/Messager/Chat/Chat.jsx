import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../../../redux/slices/messagerSlice';
import ApiService from '../../../services/ApiService';
import styles from './Chat.module.scss';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useEffect } from 'react';
import { setOtherUserData } from '../../../redux/slices/otherUserSlice';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';

const Chat = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const { uid } = useSelector((state) => state.userData);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ApiService.getOtherUserData(activeChat)
      .then((data) => setInterlocutorData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const [interlocutorData, setInterlocutorData] = useState({});
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    ApiService.sendMessage(activeChat, data);
    reset();
  };

  onSnapshot(doc(db, 'Chats', uid), (doc) => {
    const messages = Object.values(doc.data()[activeChat]);
    messages.sort((prev, next) => prev.createdAt - next.createdAt);
    setMessages(messages);
  });

  const openOtherUserProfile = (uid) => {
    ApiService.getOtherUserData(uid)
      .then((data) => {
        dispatch(setOtherUserData(data.data));
        navigate(`/profile${data.data.uid}`);
      })
      .catch((error) => console.log(error));
  };

  if (loading) {
    return null;
  }

  if (!messages || !messages.length) {
    return null;
  }

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between border-b border-gray-200 p-2">
        <div
          className="flex justify-between text-gray-500 cursor-pointer hover:text-darkGreen w-20"
          onClick={() => dispatch(setActiveChat(null))}
        >
          <ChevronLeftIcon className="w-6" />
          <p>Return</p>
        </div>
        <div
          className="text-darkGreen cursor-pointer hover:text-gray-800"
          onClick={() => openOtherUserProfile(interlocutorData.uid)}
        >
          <p>{interlocutorData.fullName}</p>
        </div>
        <div className="w-20 flex justify-end">
          <img
            src={
              interlocutorData.avatarUrl
                ? interlocutorData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
            className="border border-gray-300 w-12 h-12 rounded-full cursor-pointer"
            onClick={() => openOtherUserProfile(interlocutorData.uid)}
          />
        </div>
      </div>
      <div className="w-full h-[65vh] border-b border-gray-200 p-4 overflow-y-auto relative">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.uid === uid ? styles.myMessage : styles.otherUserMessage
            }
          >
            <div>
              <img
                src={message.avatarUrl ? message.avatarUrl : defaultAvatar}
                alt="avatar"
                className="w-9 h-9 rounded-full"
              />
            </div>
            <div className="ml-2 w-60 text-sm overflow-scroll">
              <p className="text-darkGreen">{message.fullName}</p>
              <p className="text-gray-700">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="flex w-full items-center py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          style={{ resize: 'none' }}
          type="text"
          name="message"
          id="message"
          className={styles.messageInput}
          {...register('message', { required: true })}
        />
        <button type="submit">
          <ChevronDoubleRightIcon className="w-8 ml-8 text-darkGreen cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
