import React from 'react';
import { useSelector } from 'react-redux';
import UserPost from '../../Posts/UserPost';
import OtherUserPost from '../../Posts/OtherUserPost';

const UserBoard = (props) => {
  const { uid } = useSelector((state) => state.userData);

  if (!props.userData) {
    return null;
  }

  return (
    <div className="ml-8 p-5 rounded-lg w-full border border-gray-300">
      {uid === props.userData.uid ? <UserPost /> : <OtherUserPost />}
    </div>
  );
};

export default UserBoard;
