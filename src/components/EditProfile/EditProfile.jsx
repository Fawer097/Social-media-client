import { ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../firebase';
import styles from './EditProfile.module.scss';
import whiteBg from '../../images/whiteBg.jpeg';
import defaultAvatar from '../../images/defaultAvatar.jpeg';
import UserService from '../../services/UserService';
import { useForm } from 'react-hook-form';
import ValidationService from '../../services/ValidationService';
import { $api } from '../../http';
import { setUserData } from '../../redux/slices/userSlice';

const EditProfile = () => {
  const state = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const avatarRef = ref(storage, `${state.uid}/avatar/avatar`);
  const [avatarUrl, setAvatarUrl] = useState();
  const [avatarLoad, setAvatarLoad] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => {
    UserService.showAvatar(avatarRef, setAvatarUrl, setAvatarLoad);
  }, []);

  const changeAvatar = (event) => {
    const avatar = event.target.files[0];
    if (state.uid) {
      const metadata = {
        contentType: avatar.type,
        name: 'avatar',
      };
      uploadBytes(avatarRef, avatar, metadata)
        .then(() =>
          UserService.showAvatar(avatarRef, setAvatarUrl, setAvatarLoad)
        )
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
    <div className="px-6 pt-4">
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col items-center">
          <label htmlFor="uploadAvatar">
            <img
              className="w-32 h-32 rounded-full cursor-pointer border border-gray-400"
              src={
                (avatarLoad && whiteBg) ||
                avatarUrl ||
                (!avatarUrl && defaultAvatar)
              }
              alt="avatar"
            />
          </label>
          <input
            type="file"
            name="uploadAvatar"
            id="uploadAvatar"
            className="hidden"
            onChange={changeAvatar}
          />
          <p className="text-xs mt-5 text-gray-400">
            Click on the avatar to change it
          </p>
        </div>
        <form className="w-[550px] mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.sectionHeader}>
            <h4>Personal information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <label htmlFor="first-name" className={styles.label}>
                First Name:
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className={[styles.input, 'w-40'].join(' ')}
                {...setValue('firstName', state.firstName)}
                {...register('firstName', ValidationService.nameValidation())}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="last-name" className={styles.label}>
                Last Name:
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className={[styles.input, 'w-42'].join(' ')}
                {...setValue('lastName', state.lastName)}
                {...register('lastName', ValidationService.nameValidation())}
              />
            </div>
          </div>
          <div className="flex items-center mt-6">
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
              {...setValue('dateOfBirth', state.dateOfBirth)}
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
              {...setValue('email', state.email)}
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
              {...setValue('about', state.about)}
            />
          </div>
          <div className="flex items-center mt-6 mb-8">
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
              {...setValue('site', state.site)}
            />
          </div>
          <div className={styles.sectionHeader}>
            <h4>Location information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6 mb-8">
            <div className="flex items-center">
              <label htmlFor="city" className={styles.label}>
                City:
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className={[styles.input, 'w-42'].join(' ')}
                {...register('city', ValidationService.inputValidation())}
                {...setValue('city', state.city)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="country" className={styles.label}>
                Country:
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className={[styles.input, 'w-42'].join(' ')}
                {...register('country', ValidationService.inputValidation())}
                {...setValue('country', state.country)}
              />
            </div>
          </div>
          <div className={styles.sectionHeader}>
            <h4>Job information</h4>
          </div>
          <hr />
          <div className="flex justify-between mt-6 mb-10">
            <div className="flex items-center">
              <label htmlFor="company" className={styles.label}>
                Company:
              </label>
              <input
                type="text"
                name="company"
                id="company"
                className={[styles.input, 'w-42'].join(' ')}
                {...register('company', ValidationService.inputValidation())}
                {...setValue('company', state.company)}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="post" className={styles.label}>
                Post:
              </label>
              <input
                type="text"
                name="post"
                id="post"
                className={[styles.input, 'w-42'].join(' ')}
                {...register('post', ValidationService.inputValidation())}
                {...setValue('post', state.post)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className={styles.button}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
