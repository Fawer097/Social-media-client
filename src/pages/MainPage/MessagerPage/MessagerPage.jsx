import React from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../../../components/Messager/ChatList/ChatList';
import Chat from '../../../components/Messager/Chat/Chat';
import { useState } from 'react';
import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import userService from '../../../services/userService';
import styles from './MessagerPage.module.scss';
import Loader from '../../../components/Loader/Loader';
import EmptyMessage from '../../../components/EmptyMessage/EmptyMessage';

const MessagerPage = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const { userData } = useSelector((state) => state);
  const [chatsData, setChatsData] = useState([]);
  const [loading, setLoaging] = useState(false);

  useEffect(() => {
    setLoaging(true);
    onSnapshot(doc(db, 'Chats', userData.uid), async (doc) => {
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
        if (lastMessage) {
          const { senderUid, receiverUid, imageUrl, message, createdAt } =
            lastMessage;
          let interlocutor =
            senderUid === userData.uid ? receiverUid : senderUid;

          await userService.getOtherUserData(interlocutor).then((data) => {
            const { avatarUrl, uid, fullName } = data.data;
            chatsData.push({
              avatarUrl,
              uid,
              fullName,
              lastMessage:
                senderUid === userData.uid
                  ? { message, imageUrl, avatarUrl: userData.avatarUrl }
                  : { message, imageUrl, avatarUrl: false },
              createdAt,
            });
          });
        }
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
    return (
      <div className={styles.wrapper}>
        <div className="w-full h-full flex items-center justify-center">
          <Loader size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {chatsData.length ? (
        activeChat ? (
          <Chat />
        ) : (
          <ChatList chatsData={chatsData} />
        )
      ) : (
        <EmptyMessage message="You don't have any chats yet." />
      )}
    </div>
  );
};

export default MessagerPage;
