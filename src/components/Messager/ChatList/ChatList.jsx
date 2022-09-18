import React from 'react';
import ChatCard from '../ChatCard/ChatCard';
import { useState } from 'react';
import userService from '../../../services/userService';

const ChatList = (props) => {
  const { chatsData } = props;
  const [query, setQuery] = useState('');

  return (
    <div>
      <div className="w-full border-b border-gray-200 mb-4 h-10">
        <input
          type="search"
          placeholder="Find chats"
          className="w-full h-3/4 px-6 outline-none"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {userService.filterUsers(chatsData, query).map((chat) => (
        <ChatCard key={chat.uid} data={chat} />
      ))}
    </div>
  );
};

export default ChatList;
