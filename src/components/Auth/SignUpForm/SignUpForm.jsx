import React from 'react';
import styles from './SignUpForm.module.scss';
import logo from '../../../images/logo_black.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../../../services/AuthService';
import ValidationService from '../../../services/ValidationService';
import { useDispatch } from 'react-redux';
import {
  setSuccessModal,
  setErrorModal,
} from '../../../redux/slices/modalsSlice';
import FormErrorParagraph from '../../FormErrorParagraph/FormErrorParagraph';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    AuthService.signUp(data)
      .then((response) => {
        dispatch(setSuccessModal({ active: true }));
        reset();
      })
      .catch((error) => {
        dispatch(setErrorModal({ active: true, message: error.response.data }));
      });
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
                  {...register('firstName', ValidationService.nameValidation())}
                />
                {errors.firstName ? (
                  <FormErrorParagraph message={errors.firstName.message} />
                ) : (
                  <div className="h-6"></div>
                )}
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
                  {...register('lastName', ValidationService.nameValidation())}
                />
                {errors.lastName ? (
                  <FormErrorParagraph message={errors.lastName.message} />
                ) : (
                  <div className="h-6"></div>
                )}
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
                  min={ValidationService.minDate()}
                  max={ValidationService.maxDate()}
                  className={
                    errors.dateOfBirth
                      ? [styles.input, styles.inputError, 'w-full'].join(' ')
                      : [styles.input, 'w-full'].join(' ')
                  }
                  {...register('dateOfBirth', {
                    required: 'This field must be filled',
                  })}
                />
                {errors.dateOfBirth ? (
                  <FormErrorParagraph message={errors.dateOfBirth.message} />
                ) : (
                  <div className="h-6"></div>
                )}
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
                {errors.gender ? (
                  <FormErrorParagraph message={errors.gender.message} />
                ) : (
                  <div className="h-6"></div>
                )}
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
                {...register('email', ValidationService.emailValidation())}
              />
              {errors.email ? (
                <FormErrorParagraph message={errors.email.message} />
              ) : (
                <div className="h-6"></div>
              )}
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
                  {...register(
                    'createPassword',
                    ValidationService.passwordValidation()
                  )}
                />
                {errors.createPassword ? (
                  <FormErrorParagraph message={errors.createPassword.message} />
                ) : (
                  <div className="h-6"></div>
                )}
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
                  {...register(
                    'confirmPassword',
                    ValidationService.passwordsMatchValidation(getValues)
                  )}
                />
                {errors.confirmPassword ? (
                  <FormErrorParagraph
                    message={errors.confirmPassword.message}
                  />
                ) : (
                  <div className="h-6"></div>
                )}
              </div>
            </div>
          </div>

          <p className={styles.linkWrapper}>
            Already have an account?
            <Link to="/signIn" className="ml-1 text-base text-darkGreen">
              Sign in
            </Link>
          </p>

          <div className="mt-7">
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
