import React from 'react';
import ChatCard from '../ChatCard/ChatCard';

const ChatList = (props) => {
  if (!props.chatsData) {
    return null;
  }

  return (
    <div>
      {props.chatsData.map((chat) => (
        <ChatCard key={chat.uid} data={chat} />
      ))}
    </div>
  );
};

export default ChatList;
