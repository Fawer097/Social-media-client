import React from 'react';
import styles from './SignInForm.module.scss';
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../firebase';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo_black.png';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [signError, setSignError] = useState();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        reset();
        setSignError();
        navigate('/feed');
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          setSignError('User is not found');
        } else if (errorCode === 'auth/wrong-password') {
          setSignError('Invalid password');
        } else setSignError('Authorisation error');
      });
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
              errors.email
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

        {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}

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
