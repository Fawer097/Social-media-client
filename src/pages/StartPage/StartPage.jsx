import React from 'react';
import styles from './StartPage.module.scss';
import StartPageHeader from '../../components/StartPageHeader/StartPageHeader';

const StartPage = () => {
  return (
    <div className={styles.wrapper}>
      <StartPageHeader />
    </div>
  );
};

export default StartPage;
