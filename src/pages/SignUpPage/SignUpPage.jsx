import React from 'react';
import styles from './SignUpPage.module.scss';
import image from '../../images/signUpImage2.jpeg';
import SignUpForm from '../../components/Auth/SignUpForm/SignUpForm';

const SignUpPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img src={image} alt="welcome" className={styles.image} />
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
