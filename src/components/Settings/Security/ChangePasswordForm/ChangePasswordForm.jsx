import React from 'react';
import { useForm } from 'react-hook-form';
import { $api } from '../../../../http';
import ValidationService from '../../../../services/ValidationService';
import FormErrorParagraph from '../../../FormErrorParagraph/FormErrorParagraph';
import styles from '../Styles.module.scss';

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    $api
      .post('/changePassword', data)
      .then((response) => {
        reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <label htmlFor="password" className={[styles.label, 'w-24'].join(' ')}>
          Password:
        </label>
        <div className="w-full">
          <input
            type="password"
            name="password"
            id="password"
            className={
              errors.password
                ? [styles.input, styles.inputError, 'w-full'].join(' ')
                : [styles.input, 'w-full'].join(' ')
            }
            {...register('password', ValidationService.passwordValidation())}
          />
          {errors.password ? (
            <FormErrorParagraph message={errors.password.message} />
          ) : (
            <div className="h-6"></div>
          )}
        </div>
      </div>
      <div className="flex mt-2">
        <label
          htmlFor="new-password"
          className={[styles.label, 'w-40'].join(' ')}
        >
          New password:
        </label>
        <div className="w-full">
          <input
            type="password"
            name="new-password"
            id="new-password"
            className={
              errors.newPassword
                ? [styles.input, styles.inputError, 'w-full'].join(' ')
                : [styles.input, 'w-full'].join(' ')
            }
            {...register('newPassword', ValidationService.passwordValidation())}
          />
          {errors.newPassword ? (
            <FormErrorParagraph message={errors.newPassword.message} />
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

export default ChangePasswordForm;
