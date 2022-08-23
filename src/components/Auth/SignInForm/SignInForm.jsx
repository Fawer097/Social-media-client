import React from 'react';
import styles from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../images/logo_black.png';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/slices/userSlice';
import AuthService from '../../../services/AuthService';
import { setAuthStatus } from '../../../redux/slices/authSlice';

const SignInForm = () => {
  const [signError, setSignError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    AuthService.signIn(data)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken);
        reset();
        dispatch(setUserData(response.data.userData));
        dispatch(setAuthStatus(true));
        navigate('/feed');
      })
      .catch((error) => setSignError(error.response.data));
  };

  return (
    <div className={styles.wrapper}>
      <div className="w-48 absolute top-2">
        <Link to="/">
          <img src={logo} alt="logo" className="hover:scale-105 duration-500" />
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
              errors.email || signError
                ? [styles.emailInput, styles.inputError].join(' ')
                : styles.emailInput
            }
            {...register('email', {
              required: 'Fields must be filled',
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                message: 'Invalid characters!',
              },
            })}
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className={
              errors.password || signError
                ? [styles.passwordInput, styles.inputError].join(' ')
                : styles.passwordInput
            }
            {...register('password', {
              required: 'Fields must be filled',
              minLength: {
                value: 6,
                message: 'Minimum 6 characters',
              },
              maxLength: {
                value: 28,
                message: 'No more than 28 characters',
              },
              pattern: {
                value: /^\S*$/,
                message: 'Password must be without spaces',
              },
            })}
          />
        </div>

        <div className={styles.errorWrapper}>
          {(errors.email || errors.password || signError) && (
            <div className="flex items-center">
              <ExclamationCircleIcon width={20} />
              <p className="ml-1">
                {(errors.email && errors.email.message) ||
                  (errors.password && errors.password.message) ||
                  signError}
              </p>
            </div>
          )}
        </div>

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
  );
};

export default SignInForm;
