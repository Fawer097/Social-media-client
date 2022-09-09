import React from 'react';
import OtherUserProfile from '../../../components/Profile/OtherUserProfile/OtherUserProfile';

const ProfilePage = (props) => {
  return (
    <div className="w-full h-full mx-4">
      <OtherUserProfile userData={props.userData} />
    </div>
  );
};

export default ProfilePage;
