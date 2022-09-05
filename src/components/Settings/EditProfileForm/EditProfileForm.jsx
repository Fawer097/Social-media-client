import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../../firebase';
import styles from './EditProfileForm.module.scss';
import defaultAvatar from '../../../images/defaultAvatar.jpeg';
import { useForm } from 'react-hook-form';
import ValidationService from '../../../services/ValidationService';
import { $api } from '../../../http/index';
import { setUserData } from '../../../redux/slices/userSlice';
import FormErrorParagraph from '../../FormErrorParagraph/FormErrorParagraph';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userData);
  const [avatarUrl, setAvatarUrl] = useState(state.avatarUrl);
  const avatarRef = ref(storage, `${state.uid}/avatar/avatar`);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      avatarUrl: state.avatarUrl,
      firstName: state.firstName,
      lastName: state.lastName,
      dateOfBirth: state.dateOfBirth,
      email: state.email,
      about: state.about,
      site: state.site,
      city: state.city,
      country: state.country,
      company: state.company,
      post: state.post,
    },
  });

  const changeAvatar = (event) => {
    const avatar = event.target.files[0];
    if (state.uid) {
      const metadata = {
        contentType: avatar.type,
        name: 'avatar',
      };
      uploadBytes(avatarRef, avatar, metadata)
        .then(() => {
          getDownloadURL(avatarRef)
            .then((url) => {
              $api
                .post('/updateUserData', { avatarUrl: '' })
                .then((response) => {
                  setAvatarUrl(url);
                  setValue('avatarUrl', url);
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => {});
        })
        .catch((error) => console.log(error));
    }
  };

  const onSubmit = (data) => {
    $api
      .post('/updateUserData', data)
      .then((response) => {
        dispatch(setUserData(response.data));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col items-center px-6 pt-12">
      <form className="w-[550px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center mb-10">
          <label htmlFor="uploadAvatar">
            <img
              className="w-32 h-32 rounded-full cursor-pointer border border-gray-300"
              src={avatarUrl ? avatarUrl : defaultAvatar}
              alt="avatar"
            />
          </label>
          <input
            type="file"
            name="uploadAvatar"
            id="uploadAvatar"
            className="hidden"
            {...register('avatarUrl', { onChange: changeAvatar })}
          />
          <p className="text-xs mt-5 text-gray-400">
            Click on the avatar to change it
          </p>
        </div>
        <div className={styles.sectionHeader}>
          <h4>Personal information</h4>
          <hr />
        </div>
        <div className="flex justify-between mt-6">
          <div className="flex">
            <label
              htmlFor="first-name"
              className={[styles.label, 'mt-1'].join(' ')}
            >
              First Name:
            </label>
            <div>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className={
                  errors.firstName
                    ? [styles.input, styles.inputError, 'w-40'].join(' ')
                    : [styles.input, 'w-40'].join(' ')
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
          <div className="flex">
            <label
              htmlFor="last-name"
              className={[styles.label, 'mt-1'].join(' ')}
            >
              Last Name:
            </label>
            <div>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className={
                  errors.lastName
                    ? [styles.input, styles.inputError, 'w-42'].join(' ')
                    : [styles.input, 'w-42'].join(' ')
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
        <div className="flex items-center mt-2">
          <label
            htmlFor="date-of-birth"
            className={[styles.label, 'w-32'].join(' ')}
          >
            Date of Birth:
          </label>
          <input
            type="date"
            name="date-of-birth"
            id="date-of-birth"
            className={[styles.input, 'w-full'].join(' ')}
            disabled
            {...register('dateOfBirth')}
          />
        </div>
        <div className="flex items-center mt-6">
          <label htmlFor="email" className={[styles.label, 'w-36'].join(' ')}>
            Email address:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={[styles.input, 'w-full'].join(' ')}
            disabled
            {...register('email')}
          />
        </div>
        <div className="flex items-center mt-6">
          <label htmlFor="about" className={[styles.label, 'w-24'].join(' ')}>
            About me:
          </label>
          <textarea
            placeholder="You can write a little about yourself..."
            style={{ resize: 'none' }}
            type="text"
            name="about"
            id="about"
            className={styles.aboutInput}
            {...register('about')}
          />
        </div>
        <div className="flex items-center mt-6 mb-10">
          <label
            htmlFor="personal-site"
            className={[styles.label, 'w-32'].join(' ')}
          >
            Personal site:
          </label>
          <input
            type="url"
            name="personal-site"
            id="personal-site"
            className={[styles.input, 'w-full'].join(' ')}
            {...register('site')}
          />
        </div>
        <div className={styles.sectionHeader}>
          <h4>Location information</h4>
          <hr />
        </div>
        <div className="flex justify-between mt-6 mb-3">
          <div className="flex">
            <label htmlFor="city" className={[styles.label, 'mt-1'].join(' ')}>
              City:
            </label>
            <div>
              <input
                type="text"
                name="city"
                id="city"
                className={
                  errors.city
                    ? [styles.input, styles.inputError, 'w-42'].join(' ')
                    : [styles.input, 'w-42'].join(' ')
                }
                {...register('city', ValidationService.latinValidation())}
              />
              {errors.city ? (
                <FormErrorParagraph message={errors.city.message} />
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
          <div className="flex">
            <label
              htmlFor="country"
              className={[styles.label, 'mt-1'].join(' ')}
            >
              Country:
            </label>
            <div>
              <input
                type="text"
                name="country"
                id="country"
                className={
                  errors.country
                    ? [styles.input, styles.inputError, 'w-42'].join(' ')
                    : [styles.input, 'w-42'].join(' ')
                }
                {...register('country', ValidationService.latinValidation())}
              />
              {errors.country ? (
                <FormErrorParagraph message={errors.country.message} />
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.sectionHeader}>
          <h4>Job information</h4>
          <hr />
        </div>
        <div className="flex justify-between mt-6 mb-10">
          <div className="flex">
            <label
              htmlFor="company"
              className={[styles.label, 'mt-1'].join(' ')}
            >
              Company:
            </label>
            <div>
              <input
                type="text"
                name="company"
                id="company"
                className={
                  errors.company
                    ? [styles.input, styles.inputError, 'w-42'].join(' ')
                    : [styles.input, 'w-42'].join(' ')
                }
                {...register('company', ValidationService.latinValidation())}
              />
              {errors.company ? (
                <FormErrorParagraph message={errors.company.message} />
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
          <div className="flex">
            <label htmlFor="post" className={[styles.label, 'mt-1'].join(' ')}>
              Post:
            </label>
            <div>
              <input
                type="text"
                name="post"
                id="post"
                className={
                  errors.post
                    ? [styles.input, styles.inputError, 'w-42'].join(' ')
                    : [styles.input, 'w-42'].join(' ')
                }
                {...register('post', ValidationService.latinValidation())}
              />
              {errors.post ? (
                <FormErrorParagraph message={errors.post.message} />
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;