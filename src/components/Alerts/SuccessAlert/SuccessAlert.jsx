import { DocumentCheckIcon } from '@heroicons/react/24/outline';
import React from 'react';
import styles from './SuccessAlert.module.scss';

const SuccessAlert = (props) => {
  return (
    <div className={styles.wrapper} role="alert">
      <DocumentCheckIcon className="w-5 mr-2" />
      <p>{props.text}</p>
    </div>
  );
};

export default SuccessAlert;
