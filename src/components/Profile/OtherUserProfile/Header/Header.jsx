import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import defaultAvatar from '../../../../images/defaultAvatar.jpeg';
import { setImageModal } from '../../../../redux/slices/modalsSlice';

const Header = (props) => {
  const dispatch = useDispatch();
  const { userData } = props;

  if (!userData) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      <div className="flex absolute top-24 left-10">
        <div>
          <img
            className="w-32 h-32 rounded-full cursor-pointer"
            src={userData.avatarUrl ? userData.avatarUrl : defaultAvatar}
            alt="avatar"
            id="avatar"
            onClick={
              userData.avatarUrl
                ? () =>
                    dispatch(
                      setImageModal({
                        active: true,
                        url: userData.avatarUrl,
                      })
                    )
                : null
            }
          />
        </div>
        <div className="ml-5 mt-4 tracking-wide">
          <p className="text-2xl text-gray-800">{userData.fullName}</p>
          {userData.showEmail && (
            <p className="text-sm ml-0.5 text-gray-100">{userData.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
