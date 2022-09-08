import React from 'react';
import { useSelector } from 'react-redux';
import MyProfile from '../../../components/Profile/MyProfile';
import OtherUserProfile from '../../../components/Profile/OtherUserProfile';

const ProfilePage = (props) => {
  const { uid } = useSelector((state) => state.userData);

  if (!props.userData) {
    return null;
  }

  return (
    <div className="w-full h-full mx-4">
      {uid === props.userData.uid ? (
        <MyProfile userData={props.userData} />
      ) : (
        <OtherUserProfile userData={props.userData} />
      )}
    </div>
  );
};

export default ProfilePage;
