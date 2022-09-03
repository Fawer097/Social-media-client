import React from 'react';
import styles from './FriendsFilter.module.scss';

const FriendsFilter = () => {
  return (
    <div className="flex flex-col items-center min-w-[240px] border border-gray-300 rounded-tl-lg pt-6 px-4">
      <div className="border-b border-gray-200 text-gray-700 w-full text-center pb-2">
        <h3>Search Options</h3>
      </div>
      <div className={styles.optionSection}>
        <h4>Gender</h4>
      </div>
      <div className={styles.optionSection}>
        <h4>Age</h4>
      </div>
      <div className={styles.optionSection}>
        <h4>City</h4>
      </div>
    </div>
  );
};

export default FriendsFilter;
