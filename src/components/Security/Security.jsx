import React from 'react';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import styles from './Styles.module.scss';
import ChangeEmailForm from './ChangeEmailForm/ChangeEmailForm';

const Security = () => {
  return (
    <div className="flex justify-center w-full px-6 pt-16">
      <div className="flex flex-col items-center w-[450px]">
        <div className="flex flex-col items-center w-full">
          <div className={styles.sectionHeader}>
            <h4>Change email</h4>
            <hr />
          </div>
          <ChangeEmailForm />
        </div>
        <div className="flex flex-col items-center w-full mt-16">
          <div className={styles.sectionHeader}>
            <h4>Change password</h4>
            <hr />
          </div>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default Security;
