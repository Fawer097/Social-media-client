import React from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../../../components/Messager/ChatList/ChatList';
import Chat from '../../../components/Messager/Chat/Chat';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import userService from '../../../services/userService';

const MessagerPage = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const { uid } = useSelector((state) => state.userData);
  const [chatsData, setChatsData] = useState([]);
  const [loading, setLoaging] = useState(false);

  useEffect(() => {
    setLoaging(true);
    onSnapshot(doc(db, 'Chats', uid), async (doc) => {
      if (!doc.data()) {
        setLoaging(false);
        return;
      }
      const lastMessagesArr = [];

      Object.values(doc.data()).forEach((messageObj) => {
        const messagesArr = Object.values(messageObj);
        messagesArr.sort(
          (prev, next) => next.createdAt.seconds - prev.createdAt.seconds
        );
        lastMessagesArr.push(messagesArr[0]);
      });

      const chatsData = [];
      for (let lastMessage of lastMessagesArr) {
        const { receiverUid, imageUrl, message, createdAt } = lastMessage;
        await userService.getOtherUserData(receiverUid).then((data) => {
          const userData = data.data;
          const { avatarUrl, uid, fullName } = userData;
          chatsData.push({
            avatarUrl,
            uid,
            fullName,
            lastMessage: message,
            createdAt,
            imageUrl,
          });
        });
      }
      setChatsData(chatsData);
      setLoaging(false);
    });
  }, []);

  if (chatsData.length) {
    chatsData.sort(
      (prev, next) => next.createdAt.seconds - prev.createdAt.seconds
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-4 p-4 w-full border border-gray-300 rounded-t-lg">
      {chatsData.length ? (
        activeChat ? (
          <Chat />
        ) : (
          <ChatList chatsData={chatsData} />
        )
      ) : (
        <div className="flex flex-col items-center text-center mt-8 text-gray-400">
          <p className="w-60">You don't have any chats yet.</p>
        </div>
      )}
    </div>
  );
};

export default MessagerPage;
