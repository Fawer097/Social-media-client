import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { $api } from '../../../../http';
import { setUserEmail } from '../../../../redux/slices/userSlice';
import validationService from '../../../../services/validationService';
import FormErrorParagraph from '../../../FormErrorParagraph/FormErrorParagraph';
import styles from '../Styles.module.scss';

const ChangeEmailForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    $api
      .post('/changeEmail', data)
      .then((response) => {
        reset();
        dispatch(setUserEmail(response.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <label htmlFor="email" className={[styles.label, 'w-56'].join(' ')}>
          New email address:
        </label>
        <div className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            className={
              errors.email
                ? [styles.input, styles.inputError, 'w-full'].join(' ')
                : [styles.input, 'w-full'].join(' ')
            }
            {...register('email', validationService.emailValidation())}
          />
          {errors.email ? (
            <FormErrorParagraph message={errors.email.message} />
          ) : (
            <div className="h-6"></div>
          )}
        </div>
      </div>
      <div className="flex">
        <label
          htmlFor="email-password"
          className={[styles.label, 'w-24'].join(' ')}
        >
          Password:
        </label>
        <div className="w-full">
          <input
            type="password"
            name="password"
            id="email-password"
            className={
              errors.password
                ? [styles.input, styles.inputError, 'w-full'].join(' ')
                : [styles.input, 'w-full'].join(' ')
            }
            {...register('password', validationService.passwordValidation())}
          />
          {errors.password ? (
            <FormErrorParagraph message={errors.password.message} />
          ) : (
            <div className="h-6"></div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" className={styles.button}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ChangeEmailForm;
