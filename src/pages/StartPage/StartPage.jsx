import React from 'react';
import styles from './StartPage.module.scss';
import StartHeader from '../../components/StartHeader/StartHeader';

const StartPage = () => {
  return (
    <div className={styles.wrapper}>
      <StartHeader />
    </div>
  );
};

export default StartPage;
