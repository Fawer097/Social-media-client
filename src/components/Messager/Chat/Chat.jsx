import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChat } from '../../../redux/slices/messagerSlice';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useEffect } from 'react';
import { setOtherUser } from '../../../redux/slices/otherUserSlice';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import MyMessage from '../MyMessage/MyMessage';
import InterlocutorMessage from '../InterlocutorMessage/InterlocutorMessage';
import userService from '../../../services/userService';
import MessageInput from '../MessageInput/MessageInput';
import messagerService from '../../../services/messagerService';

const Chat = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const { userData } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);
  const [interlocutorData, setInterlocutorData] = useState({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    userService
      .getOtherUserData(activeChat)
      .then((data) => setInterlocutorData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onSnapshot(doc(db, 'Chats', userData.uid), (doc) => {
      const messages = Object.values(doc.data()[activeChat]);
      messages.sort((prev, next) => prev.createdAt - next.createdAt);
      setMessages(messages);
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
        <div className="w-1/4 border-b border-gray-200 h-7">
          <input
            type="search"
            placeholder="Search messages..."
            className="w-full px-2 outline-none text-sm"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div
          className="flex min-w-1/3 items-center pr-2 cursor-pointer text-darkGreen text-sm hover:text-gray-800"
          onClick={openOtherUserProfile}
        >
          <img
            src={
              interlocutorData.avatarUrl
                ? interlocutorData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
            className="w-8 h-8 rounded-full mr-4"
          />
          <p>{interlocutorData.fullName}</p>
        </div>
      </div>
      <div className="w-full h-[65vh] max-h-[800px] border-b border-gray-200 py-4 pl-4 pr-8 overflow-y-auto relative">
        {messages.length && !loading
          ? messagerService
              .filterMessages(messages, query)
              .map((message) =>
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
      <MessageInput />
    </div>
  );
};

export default Chat;
