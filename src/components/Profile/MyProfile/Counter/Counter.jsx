import React from 'react';
import styles from './Counter.module.scss';

const Counter = (props) => {
  return (
    <div className={styles.counterWrapper}>
      <div className="text-gray-500">
        <h5>{props.title}</h5>
      </div>
      <div className="text-xl text-gray-700">{props.count}</div>
    </div>
  );
};

export default Counter;
