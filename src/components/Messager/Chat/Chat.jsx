import {
  PaperAirplaneIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveChat,
  setLastMessage,
} from '../../../redux/slices/messagerSlice';
import ApiService from '../../../services/ApiService';
import styles from './Chat.module.scss';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useEffect } from 'react';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import MyMessage from '../MyMessage/MyMessage';
import InterlocutorMessage from '../InterlocutorMessage/InterlocutorMessage';

const Chat = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const { userData } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);
  const [interlocutorData, setInterlocutorData] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ApiService.getOtherUserData(activeChat)
      .then((data) => setInterlocutorData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    ApiService.sendMessage(activeChat, data);
    reset();
  };

  useEffect(() => {
    onSnapshot(doc(db, 'Chats', userData.uid), (doc) => {
      const messages = Object.values(doc.data()[activeChat]);
      messages.sort((prev, next) => prev.createdAt - next.createdAt);
      setMessages(messages);
      dispatch(setLastMessage(messages[messages.length - 1].message));
    });
  }, []);

  const openOtherUserProfile = () => {
    dispatch(setOtherUser(interlocutorData.uid));
    navigate(`/profile${interlocutorData.uid}`);
  };

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
          onClick={openOtherUserProfile}
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
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={openOtherUserProfile}
          />
        </div>
      </div>
      <div className="w-full h-[65vh] border-b border-gray-200 p-4 overflow-y-auto relative">
        {messages.length && !loading
          ? messages.map((message, index) =>
              message.senderUid === userData.uid ? (
                <MyMessage
                  key={message.createdAt.seconds}
                  messageData={message}
                />
              ) : (
                <InterlocutorMessage
                  key={message.createdAt.seconds}
                  userData={interlocutorData}
                  messageData={message}
                />
              )
            )
          : null}
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
          <PaperAirplaneIcon className="w-8 ml-8 text-darkGreen cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
