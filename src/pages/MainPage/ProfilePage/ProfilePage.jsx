import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserProfile from '../../../components/Profile/UserProfile';
import OtherUserProfile from '../../../components/Profile/OtherUserProfile';

const ProfilePage = (props) => {
  const { uid } = useSelector((state) => state.userData);

  return (
    <div className="w-full h-full mx-4">
      {uid === props.userData.uid ? (
        <UserProfile userData={props.userData} />
      ) : (
        <OtherUserProfile userData={props.userData} />
      )}
    </div>
  );
};

export default ProfilePage;
