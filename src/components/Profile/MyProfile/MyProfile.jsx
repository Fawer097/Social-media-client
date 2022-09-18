import React from 'react';
import Header from './Header/Header';
import Counter from './Counter/Counter';
import UserInfo from './UserInfo/UserInfo';
import PostsField from './PostsField/PostsField';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MyProfile = () => {
  const { friends, posts, images } = useSelector((state) => state.counters);

  return (
    <div className="w-full relative">
      <Header />
      <div className="flex w-full h-16">
        <div className="max-w-[300px] w-1/2 h-full"></div>
        <div className="flex ml-8 h-full">
          <a href="#posts-field">
            <Counter title={'Posts'} count={posts} />
          </a>
          <Link to="/friends">
            <Counter title={'Friends'} count={friends} />
          </Link>
          <Link to="/gallery">
            <Counter title={'Images'} count={images} />
          </Link>
        </div>
      </div>
      <div className="flex w-full mt-4">
        <UserInfo />
        <PostsField />
      </div>
    </div>
  );
};

export default MyProfile;
