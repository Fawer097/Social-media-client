import React from 'react';
import MainHeader from '../../../components/MainHeader/MainHeader';
import Menu from '../../../components/Menu/Menu';
import Footer from '../../../components/Footer/Footer';
import styles from './Feed.module.scss';

const Feed = () => {
  return (
    <div className="relative min-h-full">
      <MainHeader />
      <div className="flex w-full mt-24">
        <Menu />
        <div className="mx-4 w-2/3 border border-gray-300 rounded-t-lg">
          Feed
        </div>
        <div className="w-60 border border-gray-300 rounded-tl-lg"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Feed;
