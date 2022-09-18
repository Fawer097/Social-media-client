import React, { useState, useRef } from 'react';
import styles from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo_black.png';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/slices/userSlice';
import authService from '../../../services/authService';
import validationService from '../../../services/validationService';
import FormErrorParagraph from '../../FormErrorParagraph/FormErrorParagraph';
import { Spring, animated } from 'react-spring';
import ErrorAlert from '../../Alerts/ErrorAlert/ErrorAlert';

const SignInForm = () => {
  const [errorAlert, setErrorAlert] = useState({ show: false, message: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorAlertRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    authService
      .signIn(data)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken);
        dispatch(setUserData(response.data.userData));
        reset();
        navigate('/feed');
      })
      .catch((error) => {
        setErrorAlert({ show: true, message: error.response.data });
        setTimeout(
          () => setErrorAlert({ show: false, message: error.response.data }),
          3000
        );
      });
  };

  const fromAnimation = {
    transform: 'translateY(-55vh)',
    position: 'absolute',
    margin: 'auto',
    opacity: 0,
  };

  const toAnimation = {
    transform: 'translateY(-42vh)',
    position: 'absolute',
    margin: 'auto',
    opacity: 1,
  };

  return (
    <>
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

      <div className={styles.wrapper}>
        <div className="w-48 absolute top-2">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="hover:scale-105 duration-500"
            />
          </Link>
        </div>
        <div className={styles.headerWrapper}>
          <h2>Sign in to your account</h2>
        </div>
        <form className="mt-7 w-7/12" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              placeholder="Email address"
              className={
                errors.email
                  ? [styles.emailInput, styles.inputError].join(' ')
                  : styles.emailInput
              }
              {...register('email', validationService.emailValidation())}
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={
                errors.password
                  ? [styles.passwordInput, styles.inputError].join(' ')
                  : styles.passwordInput
              }
              {...register('password', validationService.passwordValidation())}
            />
          </div>
          {errors.email || errors.password ? (
            errors.email ? (
              <FormErrorParagraph message={errors.email.message} />
            ) : (
              <FormErrorParagraph message={errors.password.message} />
            )
          ) : (
            <div className="h-6"></div>
          )}
          <p className={styles.linkWrapper}>
            Don't have an account?
            <Link to="/signUp" className="ml-1 text-base text-darkGreen">
              Create account
            </Link>
          </p>

          <div className="mt-5">
            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
