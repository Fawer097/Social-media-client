import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import React from 'react';
import styles from './ErrorAlert.module.scss';

const ErrorAlert = (props) => {
  return (
    <div className={styles.wrapper} role="alert">
      <ShieldExclamationIcon className="w-6 mr-2" />
      <p>{props.text}</p>
    </div>
  );
};

export default ErrorAlert;
