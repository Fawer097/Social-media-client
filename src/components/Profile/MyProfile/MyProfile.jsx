import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import UserBoard from './UserBoard/UserBoard';

const MyProfile = () => {
  return (
    <div className="w-full relative">
      <Header />
      <div className="flex w-full h-16">
        <div className="max-w-[300px] w-1/2 h-full"></div>
        <div className="flex ml-8 h-full">
          <Counter title={'Posts'} count={12} />
          <Counter title={'Friends'} count={28} />
          <Counter title={'Photos'} count={4} />
        </div>
      </div>
      <div className="flex w-full mt-4">
        <UserInfo />
        <UserBoard />
      </div>
    </div>
  );
};

export default MyProfile;
