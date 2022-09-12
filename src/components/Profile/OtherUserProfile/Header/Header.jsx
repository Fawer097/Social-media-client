import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import defaultAvatar from '../../../../images/defaultAvatar.jpeg';
import { setImageModal } from '../../../../redux/slices/modalsSlice';

const Header = (props) => {
  const dispatch = useDispatch();

  if (!props.userData) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      <div className="flex absolute top-24 left-10">
        <div>
          <img
            className="w-32 h-32 rounded-full cursor-pointer"
            src={
              props.userData.avatarUrl
                ? props.userData.avatarUrl
                : defaultAvatar
            }
            alt="avatar"
            id="avatar"
            onClick={
              props.userData.avatarUrl
                ? () =>
                    dispatch(
                      setImageModal({
                        active: true,
                        url: props.userData.avatarUrl,
                      })
                    )
                : null
            }
          />
        </div>
        <div className="ml-5 mt-4 tracking-wide">
          <p className="text-2xl text-gray-800">{props.userData.fullName}</p>
          <p className="text-sm ml-0.5 text-gray-100">{props.userData.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
