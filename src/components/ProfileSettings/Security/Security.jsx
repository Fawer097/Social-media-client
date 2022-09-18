import React, { useState, useRef } from 'react';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';
import styles from './Styles.module.scss';
import ChangeEmailForm from './ChangeEmailForm/ChangeEmailForm';
import { Spring, animated } from 'react-spring';
import SuccessAlert from '../../Alerts/SuccessAlert/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert/ErrorAlert';

const Security = () => {
  const emailAlertRef = useRef(null);
  const [emailSuccessAlert, setEmailSuccessAlert] = useState(false);
  const [passSuccessAlert, setPassSuccessAlert] = useState(false);
  const passAlertRef = useRef(null);
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
  const errorAlertRef = useRef(null);

  const fromAnimation = {
    transform: 'translateY(-305%)',
    position: 'fixed',
    left: '240px',
    right: '0px',
    margin: 'auto',
    opacity: 0,
  };

  const toAnimation = {
    transform: 'translateY(-150%)',
    position: 'fixed',
    left: '240px',
    right: '0px',
    margin: 'auto',
    opacity: 1,
  };

  return (
    <>
      <Spring
        from={fromAnimation}
        to={toAnimation}
        config={{ duration: 300 }}
        reverse={!emailSuccessAlert}
        immediate={!emailAlertRef.current}
      >
        {(styles) => (
          <animated.div style={styles} ref={emailAlertRef}>
            <SuccessAlert text="Email updated successfully!" />
          </animated.div>
        )}
      </Spring>
      <Spring
        from={fromAnimation}
        to={toAnimation}
        config={{ duration: 300 }}
        reverse={!passSuccessAlert}
        immediate={!passAlertRef.current}
      >
        {(styles) => (
          <animated.div style={styles} ref={passAlertRef}>
            <SuccessAlert text="Password updated successfully!" />
          </animated.div>
        )}
      </Spring>
      <Spring
        from={fromAnimation}
        to={toAnimation}
        config={{ duration: 300 }}
        reverse={!errorAlert.show}
        immediate={!errorAlertRef.current}
      >
        {(styles) => (
          <animated.div style={styles} ref={errorAlertRef}>
            <ErrorAlert text={errorAlert.message} />
          </animated.div>
        )}
      </Spring>

      <div className="flex justify-center w-full px-6 pt-16">
        <div className="flex flex-col items-center w-[450px]">
          <div className="flex flex-col items-center w-full">
            <div className={styles.sectionHeader}>
              <h4>Change email</h4>
              <hr />
            </div>
            <ChangeEmailForm
              setSuccessAlert={setEmailSuccessAlert}
              setErrorAlert={setErrorAlert}
            />
          </div>
          <div className="flex flex-col items-center w-full mt-16">
            <div className={styles.sectionHeader}>
              <h4>Change password</h4>
              <hr />
            </div>
            <ChangePasswordForm
              setSuccessAlert={setPassSuccessAlert}
              setErrorAlert={setErrorAlert}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
