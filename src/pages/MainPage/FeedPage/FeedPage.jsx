import React from 'react';
import MainHeader from '../../../components/MainHeader/MainHeader';
import Menu from '../../../components/Menu/Menu';
import Footer from '../../../components/Footer/Footer';
import styles from './FeedPage.module.scss';

const Feed = () => {
  return (
    <div className="relative w-full max-w-[1520px] min-h-full">
      <MainHeader />
      <div className="flex flex-col w-screen items-center mt-24">
        <div className="flex w-full max-w-[1520px] min-h-[700px]">
          <Menu />
          <div className="mx-4 w-full h-full border border-gray-300 rounded-t-lg">
            Feed
          </div>
          <div className="min-w-[240px] border border-gray-300 rounded-tl-lg"></div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Feed;
