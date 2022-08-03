import React from 'react';
import SignInForm from '../../components/Auth/SignInForm/SignInForm';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
