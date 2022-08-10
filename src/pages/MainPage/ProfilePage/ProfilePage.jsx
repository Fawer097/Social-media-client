import React from 'react';
import Footer from '../../../components/Footer/Footer';
import MainHeader from '../../../components/MainHeader/MainHeader';
import Menu from '../../../components/Menu/Menu';
import Profile from '../../../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <div className="relative w-full max-w-[1920px] min-h-full">
      <MainHeader />
      <div className="flex flex-col w-screen items-center mt-24">
        <div className="flex w-full max-w-[1920px] min-h-[700px]">
          <Menu />
          <div className="mx-4 w-full h-full">
            <Profile />
          </div>
          <div className="min-w-[240px] border border-gray-300 rounded-tl-lg"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
