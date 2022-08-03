import React from 'react';
import styles from './SignUpForm.module.scss';
import logo from '../../../images/logo_black.png';
import axios from 'axios';
import { url } from '../../../config/config';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    delete data.createPassword;
    axios
      .post(url + '/api/signUp', data)
      .then((response) => {
        reset();
        alert(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  const upperFirstLetter = (event) => {
    const arr = event.target.value.split('');
    arr[0] = arr[0].toUpperCase();
    event.target.value = arr.join('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className="w-52">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="hover:scale-105 duration-500"
            />
          </Link>
        </div>
        <div className={styles.headerWrapper}>
          <h2>Create your account</h2>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formSection}>
            <div className="w-[45%]">
              <label
                htmlFor="first-name"
                className={[styles.label, 'ml-1 mb-0.5'].join(' ')}
              >
                First name:
              </label>
              <div>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoFocus
                  className={
                    errors.firstName
                      ? [styles.input, styles.inputError, 'w-4/5'].join(' ')
                      : [styles.input, 'w-4/5'].join(' ')
                  }
                  {...register('firstName', {
                    required: 'This field must be filled',
                    minLength: {
                      value: 2,
                      message: 'Minimum of 2 characters',
                    },
                    pattern: {
                      value: /^[A-Za-z]*$/,
                      message: 'Invalid characters',
                    },
                    onChange: (event) => upperFirstLetter(event),
                  })}
                />
                <div className={styles.errorWrapper}>
                  {errors.firstName && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.firstName.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[45%]">
              <label
                htmlFor="last-name"
                className={[styles.label, 'ml-1 mb-0.5'].join(' ')}
              >
                Last name:
              </label>
              <div>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className={
                    errors.lastName
                      ? [styles.input, styles.inputError, 'w-4/5'].join(' ')
                      : [styles.input, 'w-4/5'].join(' ')
                  }
                  {...register('lastName', {
                    required: 'This field must be filled',
                    minLength: {
                      value: 2,
                      message: 'Minimum of 2 characters',
                    },
                    pattern: {
                      value: /^[A-Za-z]*$/,
                      message: 'Invalid characters',
                    },
                    onChange: (event) => upperFirstLetter(event),
                  })}
                />
                <div className={styles.errorWrapper}>
                  {errors.lastName && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.lastName.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className="flex">
              <label
                htmlFor="date-of-birth"
                className={[styles.label, 'mt-1'].join(' ')}
              >
                Date of birth:
              </label>
              <div>
                <input
                  type="date"
                  name="date-of-birth"
                  id="date-of-birth"
                  min={`${new Date().getFullYear() - 120}-0${
                    new Date().getMonth() + 1
                  }-0${new Date().getDate()}`}
                  max={`${new Date().getFullYear()}-0${
                    new Date().getMonth() + 1
                  }-0${new Date().getDate()}`}
                  className={
                    errors.dateOfBirth
                      ? [styles.input, styles.inputError, 'w-full'].join(' ')
                      : [styles.input, 'w-full'].join(' ')
                  }
                  {...register('dateOfBirth', {
                    required: 'This field must be filled',
                  })}
                />
                <div className={styles.errorWrapper}>
                  {errors.dateOfBirth && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.dateOfBirth.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-[45%]">
              <label
                htmlFor="gender"
                className={[styles.label, 'mt-1 '].join(' ')}
              >
                Gender:
              </label>
              <div>
                <select
                  id="gender"
                  name="gender"
                  className={
                    errors.gender
                      ? [
                          styles.input,
                          styles.inputError,
                          'w-24 text-center cursor-pointer',
                        ].join(' ')
                      : [styles.input, 'w-24 text-center cursor-pointer'].join(
                          ' '
                        )
                  }
                  {...register('gender', {
                    required: 'This field must be filled',
                  })}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <div className={styles.errorWrapper}>
                  {errors.gender && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.gender.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex mt-4">
            <label
              htmlFor="email-address"
              className={[styles.label, 'mt-0.5'].join(' ')}
            >
              Email address:
            </label>
            <div>
              <input
                type="email"
                name="email-address"
                id="email-address"
                className={
                  errors.email
                    ? [styles.input, styles.inputError, 'w-64'].join(' ')
                    : [styles.input, 'w-64'].join(' ')
                }
                {...register('email', {
                  required: 'This field must be filled',
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                    message: 'Invalid characters',
                  },
                })}
              />
              <div className={styles.errorWrapper}>
                {errors.email && (
                  <div className="flex items-center">
                    <ExclamationCircleIcon width={20} />
                    <p className="ml-1">{errors.email.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <div className="w-[45%]">
              <label
                htmlFor="create-password"
                className={[styles.label, 'ml-1 mb-0.5'].join(' ')}
              >
                Create password:
              </label>
              <div>
                <input
                  type="password"
                  name="create-password"
                  id="create-password"
                  className={
                    errors.createPassword
                      ? [styles.input, styles.inputError, 'w-full'].join(' ')
                      : [styles.input, 'w-full'].join(' ')
                  }
                  {...register('createPassword', {
                    required: 'This field must be filled',
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
                <div className={styles.errorWrapper}>
                  {errors.createPassword && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.createPassword.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[45%]">
              <label
                htmlFor="confirm-password"
                className={[styles.label, 'ml-1 mb-0.5'].join(' ')}
              >
                Confirm password:
              </label>
              <div>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  className={
                    errors.confirmPassword
                      ? [styles.input, styles.inputError, 'w-full'].join(' ')
                      : [styles.input, 'w-full'].join(' ')
                  }
                  {...register('confirmPassword', {
                    required: 'This field must be filled',
                    validate: () => {
                      if (
                        getValues('createPassword') !==
                        getValues('confirmPassword')
                      ) {
                        return 'Password do not match';
                      }
                    },
                  })}
                />
                <div className={styles.errorWrapper}>
                  {errors.confirmPassword && (
                    <div className="flex items-center">
                      <ExclamationCircleIcon width={20} />
                      <p className="ml-1">{errors.confirmPassword.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className={styles.linkWrapper}>
            Already have an account?
            <Link to="/signIn" className="ml-1 text-base text-darkGreen">
              Sign in
            </Link>
          </p>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button}>
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
