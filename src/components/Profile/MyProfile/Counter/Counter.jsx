import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Counter.module.scss';

const Counter = (props) => {
  const { title, count } = props;
  // const navigate = useNavigate();
  // const openPage = () => {
  //   if (title === 'Friends') {
  //     navigate('/friends');
  //   } else if (title === 'Photos') {
  //     navigate('/gallery');
  //   }
  // };

  return (
    <div className={styles.counterWrapper}>
      <div className="text-gray-500">
        <h5>{title}</h5>
      </div>
      <div className="text-xl text-gray-700">{count}</div>
    </div>
  );
};

export default Counter;
