import React from 'react';
import { useSelector } from 'react-redux';
import ChatList from '../../../components/Messager/ChatList/ChatList';
import Chat from '../../../components/Messager/Chat/Chat';
import { useState } from 'react';
import { useEffect } from 'react';
import messagerService from '../../../services/messagerService';

const MessagerPage = () => {
  const { activeChat } = useSelector((state) => state.messagerData);
  const [chatsData, setChatsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    messagerService
      .getChatsData()
      .then((data) => setChatsData(data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
