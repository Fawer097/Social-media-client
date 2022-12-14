import React from 'react';
import { useForm } from 'react-hook-form';
import userService from '../../../../services/userService';
import validationService from '../../../../services/validationService';
import FormErrorParagraph from '../../../FormErrorParagraph/FormErrorParagraph';
import styles from '../Styles.module.scss';

const ChangePasswordForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    userService
      .changePassword(data)
      .then(() => {
        reset();
        props.setSuccessAlert(true);
        setTimeout(() => props.setSuccessAlert(false), 3000);
      })
      .catch((error) => {
        props.setErrorAlert({ show: true, message: error.response.data });
        setTimeout(
          () =>
            props.setErrorAlert({ show: false, message: error.response.data }),
          3000
        );
      });
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
            {...register('password', validationService.passwordValidation())}
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
            {...register(
              'newPassword',
              validationService.passwordsNotMatchValidation(getValues)
            )}
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
